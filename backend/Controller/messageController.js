const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');

exports.sendMessage = async(req,res) => {
    try{
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId, receiverId]},
        })
        // console.log('conversation => ', conversation);

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
            console.log('conversation => ', conversation);
            await User.findByIdAndUpdate(senderId, {
                $push:{conversationRoom: conversation._id}
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        await newMessage.save();

        const conversationId = conversation._id;
        // console.log('conversation id => ', conversationId);

        // console.log("new message => ", newMessage);

        if(newMessage){
            await Conversation.findByIdAndUpdate(conversationId, {
                $push:{messages: newMessage._id}
            })
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json({
            success:true,
            message:"message sent successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'error in sending message in message controler'
        })
    }
}


exports.getMessage = async (req,res) => {
    try{
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{ $all:[senderId, userToChatId]},
        }).populate('messages');

        if(!conversation){
            return res.status(200).json([]) // this will return empty array
        }

        const messages = conversation.messages;

        return res.status(200).json(
            messages,
        )
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'error in getMessage in message controler'
        })
    }
}