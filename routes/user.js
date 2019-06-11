const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator/check');
const auth = require('../middleware/auth');


//@Route -- POST user 
//@Desc -- To register a new user and returns JWT token
//@type -- Public

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
            }else{
                profileImage = req.body.profileImage;
            }
            let interests = [];
            if(req.body.interests){
                interests = req.body.interests.split(',').map(interest => interest.trim());
            }
            
            //user object 
            const user = new User({
                firstName: req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:hashedpwd,
                bio:req.body.bio,
                interests: interests,
                profileImage: profileImage,
                location:req.body.location
            });
            await user.save( err => console.log(err));
            
            const payload = {
                user:{
                    id: user.id
                }
            };
            await jwt.sign(payload, config.jwtSecret, {expiresIn: 36000}, (err, token) =>{
                if(err) throw err;
                res.json({token});
            });
        }catch(err){
            console.error(err);
            res.status(500).send("Server Error");
        }
});


//@Route -- GET users
//@Desc -- To get all the existing users
//@type -- Private (only for authenticaed users)



router.get('/', auth, async(req,res)=>{
    try{
        const users = await User.find().select('-password');
        if(!users){ return res.status(400).json({msg:"No users found"})}
        res.json({users});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


//@Route -- User Login with Email and password
//@Desc -- this route is to let the users Login
//@type -- Public

router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password','Password field cannot be empty').exists()
], async(req,res) =>{
    //Validating the inputs
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){ res.status(400).json({msg:"Email or Password is not valid"})}
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){ res.status(400).json({msg:"Email or Password is not valid"})}
        //If matches, return JWT token
        const payload = {
            user:{
                id: user._id
            }
        };

        await jwt.sign(payload, config.jwtSecret, (err, token) => {
            if (err) throw err;
            res.json({token});
        })
    }catch (err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//@Route -- GET User data
//@Desc -- Current user profile information
//@Type -- Private
router.get('/me', auth, async(req,res) => {
    try{
        const user = await User.findOne({_id: req.user.id}).select('-password');
        if(!user){ return res.status(400).json({msg:"No user found!"})}
        res.json({user});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

//@Route -- DELETE user profile
//@Desc -- To delete current user profile (keep in archive)
//@Type -- private

router.delete('/delete/:id', auth, async (req,res) =>{
    const user = await User.findOne({_id:req.params.id});
    if(!user){return res.status(400).json({msg:"User not found"})}
    //check if the user is authorized to delete
    if(user._id.toString() !== req.user.id) {
        return res.status(400).json({msg:"Unaunthorized to delete"})
    }
    //keeping copy of deleted users
    const {firstName, lastName, email, password, bio, profileImage, location, interests} = user;
    const deletedUser = new DeletedUser({
        firstName, lastName, email, password, bio, profileImage, location, interests
    });
    await deletedUser.save(err => console.log(err));
    //Delete the record
    await User.findOneAndRemove({_id:req.params.id});
    res.json({msg:"User deleted"});
});


//@Route -- PUT - update users
//@Desc -- Edit current profile information
//@type -- private

router.put('/update/:id', auth, async(req,res)=>{
    try{
        const user = await User.findOne({_id: req.params.id});
        if(!user){ return res.status(400).json({msg:"User not found!"})}
        if(user._id.toString() !== req.user.id) { return res.status(401).json({msg:"User is not authorized"})}
        const { firstName, lastName, bio, profileImage, location, interests } = req.body;
        // update only the values given in the request
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