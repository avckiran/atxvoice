const express = require('express');
const router=express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Posts = require('../models/Posts');
const DeletedPosts = require('../models/DeletedPosts');
const {check, validationResult} = require('express-validator/check');
const uuid = require('uuid');
const striptags = require('striptags');


router.post('/', [auth,[
    check('title', 'Title cannot be empty').not().isEmpty(),
    check('content', 'Content cannot be empty').not().isEmpty()
    ]], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {title, content, cover_img, likes, comments}= req.body;
    try{
        const user = await User.findById(req.user.id).select('-password');
        const post = new Posts({
            title,
            content,
            cover_img,
            user : user.id,
            user_email: user.email,
            likes,
            comments
        });
        await post.save();
        res.json({msg:"Post added"});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error!");
    }
        
});

//@Router -- GET posts
//@Desc -- To get all the posts by all users
//@Type -- Public

router.get('/', async(req,res)=>{
    try{
    const posts = await Posts.find().populate('user',['firstName','lastName','profileImage']);
    res.json(posts);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

//@Router -- Get Post by Id
//@Desc -- to get particular post by its id
//@type -- public

router.get('/:id', async(req,res)=>{
    try{
        const post = await Posts.findById(req.params.id).populate('user', ['firstName','lastName','profileImage']);
        if(!post) return res.json({error:'Post not found'})
        res.json(post);
    }catch(err){
        console.error(err.message);
        if(!err.kind === 'ObjectId'){
            return res.json({error:'Post not found'});
        }
        res.status(500).send('Server Error');
    }
})




//@Router -- Get Posts by user Id
//@Desc -- To get all posts and statistics for the user. 
//@Type -- Private

router.get('/:user_id', auth, async(req,res)=>{
    try{
        if(req.params.user_id !== req.user.id){
            return res.status(400).json({msg:"User is not authorized"});
        }
        const posts = await Posts.find({user: req.params.user_id}).populate('user',['firstName','lastName','profileImage']);
        res.json({posts, total_posts:Object.keys(posts).length});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});


//@Route -- Edit posts
//@Desc -- to let the user edit his/her post
//@Type -- Private (authorized)

router.put('/:id', [auth, [
    check('title','Title cannot be empty').not().isEmpty(),
    check('content','Content cannot be empty').not().isEmpty()
]], async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        const post = await Posts.findById(req.params.id);
        //check if post is there and user is authorized
        if(!post){ return res.status(400).json({msg: "Post not found"})}
        if(req.user.id !== post.user.toString()){ return res.status(401).json({msg:"User is not authorized"})}
        //Get the details from the req.body and upate the post object
        if(req.body.title) post.title = req.body.title;
        if(req.body.content) post.content = req.body.content;
        if(req.body.cover_img) post.cover_img = req.body.cover_img;
        await post.save();
        res.json({msg:"Post updated successfully"})
    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            res.status(400).json({msg:"Post not found"})
        }
        res.status(500).send("Server Error");
    }
});

//@Route -- Delete Posts
//@Desc -- To delete the posts (archive in DeletedPosts model)
//@Type -- Private (authorized)

router.delete('/:id', auth, async(req,res)=>{

    try{
        const post = await Posts.findById(req.params.id);
        if(!post) { return res.status(400).json({msg:"Post not found!"})}
        if(post.user.toString() !== req.user.id){ return res.status(400).json({msg:"User is not authorized"})}
        const { title, content, cover_img, user, user_email, likes, comments} = post;
        const archivedPost = new DeletedPosts({
            title,
            content,
            cover_img,
            user,
            user_email,
            likes,
            comments
        });
        await archivedPost.save();
        await Posts.findByIdAndRemove(req.params.id);
        res.json({msg:"Post deleted successfully"})

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@Route -- Like/Unlike toggle post
//@Desc -- To let user like/unlike the post
//@Type -- Private

router.put('/like/:id', auth, async(req,res) =>{
    try{
        const post = await Posts.findById(req.params.id);
        if(!post){return res.status(404).json({msg:"Post not found"})};
        //Check if already liked
        if( post.likes.filter(like => like.user.toString() === req.user.id).length >0){
            //if already liked, then unlike the post
            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
            post.likes.splice(removeIndex, 1)
            await post.save();
            return res.json({'msg':"Post Unliked", 'data': post.likes})
        }
        //if not liked, then add user to likes
        const user = await User.findById(req.user.id).select('-password');
        post.likes.unshift({user: req.user.id, email:user.email, profile_img: user.profileImage});
        await post.save();
        res.json({msg:"Post liked", 'data': post.likes});
    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId'){ res.status(404).json({msg: "Post not found"})};
        res.status(500).send("Server Error");
    }
});

// Comments Routes

//@Route : PUT Comment
//@Desc : Add a comment to the post
//@Type : Private

router.put('/comment/:id', [auth, [
    check('comment', 'Comment cannot be empty').not().isEmpty()
]], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({status: '400', errors: errors.array()});
    }
    try{
        const post = await Posts.findById(req.params.id);
        if(!post) res.json({msg:"Post not found"})

        const user = await User.findById(req.user.id).select('-password');
    
        const comment = {
            id: uuid.v4(),
            comment:req.body.comment,
            user: req.user.id,
            name: user.firstName,
            email:user.email,
            profile_img:user.profileImage,
            created_date: Date.now()
        }
        post.comments.unshift(comment);
        await post.save();
        res.json({msg:"Comment added", comment:post.comments})

    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId') res.json({msg:"Post not found"})
        res.status(500).send("Server Error");
    }

});

//@Route - PUT /:post_id/comment/:comment_id
//@Desc - to edit the comments (only for comment creator)
//@Type - Private (authorized)


router.put('/:post_id/comment/:comment_id', [auth, [
    check('comment', 'Comment cannot be empty')
]], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){ return res.status(400).json({errors:errors.array})}
    try{
        const post = await Posts.findById(req.params.post_id);
        if(!post){ return res.status(404).json({msg:"Post not found"})}
        // find index of the comment and update the comment
        const commentIndex = post.comments.findIndex(comment => comment.id === req.params.comment_id);
        if(post.comments[commentIndex].user.toString() !== req.user.id) { return res.json({msg:"User is not authorized"})}
        const user = await User.findById(req.user.id).select('-password');
        
        const comment = {
            id: post.comments[commentIndex].id || uuid.v4(),
            comment: req.body.comment,
            user: user.id,
            email: user.email,
            profileImage: user.profileImage
        }
        post.comments.set([commentIndex], comment);

        await post.save();
        res.json({post});
    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId'){ res.status(404).json({msg:"Post not found"})}
        res.status(500).send("Server Error");
    }
});

//@Route -- Delete /:post_id/comment/:comment_id
//@Desc -- To delete the comment (by the owner of the post or owner of the comment)
//@Type -- Private (auth)

router.delete('/:post_id/comment/:comment_id', auth, async(req,res)=>{
    try{
        const post = await Posts.findById(req.params.post_id);
        if(!post){return res.status(404).json({msg:"Post not found"})}
        //Get the index of the comment 
        const commentIndex = post.comments.findIndex(comment => comment.id === req.params.comment_id);
        if((post.comments[commentIndex].user.toString() || post.user.toString())!== req.user.id) { return res.json({msg:"User is not authorized"})}
        const user = await User.findById(req.user.id).select('-password');
        //remove the comment
        post.comments.splice(commentIndex, 1);
        await post.save();
        res.json({msg:"Comment Deleted"})
        
    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId') { return res.status(404).json({msg:"Post not found"})}
        res.status(500).send("Server error")
    }
});







module.exports = router;