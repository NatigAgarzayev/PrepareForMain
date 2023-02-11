import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    username: {type: String},
    comment: {type: String},
    like: {type: Number, default: 0},
    dislike: {type: Number, default: 0},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
},{timestamps: true})

export default mongoose.model('Comment', CommentSchema)