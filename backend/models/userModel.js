const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },

    gender:{
        type:String,
        enum:['Male', 'Female'],
    },
    
    profilePic:{
        type:String,
        default:"",
    },

    conversationRoom:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Conversation"
        }
    ]
},
{timestamps:true}
)

module.exports = mongoose.model("User", userSchema);