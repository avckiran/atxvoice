const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Posts = require('../models/Posts');
const DeletedPosts = require('../models/DeletedPosts');
const DeletedUser = require('../models/DeletedUser');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator/check');
const auth = require('../middleware/auth');

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