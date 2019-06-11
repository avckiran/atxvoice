const mongoose = require('mongoose');

const deletedUserSchema = new mongoose.Schema({
    firstName: { type:String, required:true },
    lastName: { type:String},
    email: { type:String, required:true },
    password: { type:String, required:true },
    bio: { type:String},
    interests: {type:Array},
    profileImage: { type:String},
    location:{type:String},
    createdDate: {type: Date, default:Date.now}
});

module.exports = DeletedUser = mongoose.model('deletedUser', deletedUserSchema);
