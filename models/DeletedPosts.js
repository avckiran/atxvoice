const mongoose = require('mongoose');

const DeletedPostSchema = new mongoose.Schema({
    title:{ type: String, required: true },
    content:{ type: String, required: true },
    cover_img:{type:String},
    user:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'user'
    },
    user_email:{type:String},
    likes:{ type: Array},
    comments:{ type: Array },
    createdDate: {type:Date, default: Date.now}
});

module.exports = DeletedPosts = mongoose.model('deletedPosts', DeletedPostSchema);
