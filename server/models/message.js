const mongoose = require("mongoose");
const User = require("./user");


messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true, 
        maxLength: 160
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

messageSchema.pre("save", async function(next){
    try {
     //find user 
     let user = await User.findById(this.user);
    //remove id of message from msg list 
    usermessage.remove(this._id);
   //save user 
   await user.save();
    //return next
    return next();
    } catch (e){
        return next(err);
    } 
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;