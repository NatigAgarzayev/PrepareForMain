import mongoose, { model, Schema } from "mongoose"

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    followers: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
},{timestamps: true})

export default mongoose.model('User', UserSchema)