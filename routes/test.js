const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const config = require('../config/dev.json');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator/check');

router.post('/', [
        check('firstName', 'First name cannot be empty').not().isEmpty(),
        check('email', 'Invalid email found').isEmail(),
        check('password', 'Password should be at least 6 characters').isLength({min:6, max:20}),
    ],
     async (req,res)=>{
    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        try{

            //check if user exists
            const existingUser = await User.findOne({email: req.body.email});
            if(existingUser){
                return res.status(400).json({"msg":"User already exists"});
            }
            
            //password hashing
            const salt = await bcrypt.genSalt(10);
            const hashedpwd = await bcrypt.hash(req.body.password, salt)
            let profileImage = '';
            //gravatar for profile image
            if(!req.body.profileImage){
                profileImage = gravatar.url(req.body.email, { s:'100', r:'pg', d:'robohash'});
            }
            
            //user object 
            const user = new User({
                firstName: req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:hashedpwd,
                profileImage: profileImage
            });
            await user.save( err => console.log(err));
            
            const payload = {
                user:{
                    id: user.id
                }
            };
            jwt.sign(payload, config.jwtSecret, {expiresIn: 36000}, (err, token) =>{
                if(err) throw err;
                res.json({token});
            });
        }catch(err){
            console.error(err);
            res.status(500).send("Server Error");
        }
});



module.exports = router;