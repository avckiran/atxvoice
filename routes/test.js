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

router.get('/', (req,res)=>{
    res.send("This route is used to test other routes! :)");
})

module.exports = router;