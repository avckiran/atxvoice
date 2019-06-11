const express = require('express');
const router = express.Router();
const User = require('../models/User');
const DeletedUser = require('../models/DeletedUser');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator/check');
const auth = require('../middleware/auth');

//@Route -- PUT - update users
//@Desc -- Edit current profile information
//@type -- private

router.put('/update/:id', auth, async(req,res)=>{
    try{
        const user = await User.findOne({_id: req.params.id});
        if(!user){ return res.status(400).json({msg:"User not found!"})}
        if(user._id.toString() !== req.user.id) { return res.status(401).json({msg:"User is not authorized"})}
        
        const { firstName, lastName, bio, profileImage, location, interests } = req.body;
        
        if(firstName) user.firstName = firstName;
        if(lastName) user.lastName = lastName;
        if(bio) user.bio = bio;
        if(profileImage) user.profileImage = profileImage;
        if(location) user.location = location;
        if(interests) user.interests = interests.split(',').map(interest => interest.trim());
        
        user.save(err => console.log(err));
        res.json({msg:"User updated"})

    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            res.status(400).json({msg:"User not found"})
        }
        res.status(500).send("Server error")
    }

})
module.exports = router;