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

router.get('/',(req,res)=>{
    res.send("test route");
});

//Delete comment Route
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
})













module.exports = router;