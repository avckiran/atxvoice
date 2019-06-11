const express = require('express');
const router=express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Posts = require('../models/Posts');
const DeletedPosts = require('../models/DeletedPosts');
const {check, validationResult} = require('express-validator/check')

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

//@Router -- Get Posts by Id
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







module.exports = router;