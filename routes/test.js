const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const config = require('../config/dev.json');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator/check');

router.get('/', async(req,res)=>{
    try{
        const users = await User.find();
        if(!users){ return res.status(400).json({msg:"No users found"})}
        res.json({users});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;