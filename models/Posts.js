const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
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
    createdDate:{type:Date, default:Date.now}
});

module.exports = Posts = mongoose.model('posts', PostSchema);
