import mongoose, { model, Schema } from "mongoose"

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    followers: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
            username: {type: String},
        }
    ],
    following: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
            username: {type: String},
        }
    ],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
},{timestamps: true})

export default mongoose.model('User', UserSchema)