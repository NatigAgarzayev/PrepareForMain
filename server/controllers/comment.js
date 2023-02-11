import Comment from "../models/Comment.js"
import Post from "../models/Post.js"
import User from '../models/User.js'

export const createComment = async (req, res) => {
    try {
        const {postId, comment} = req.body
        const user = await User.findById(req.userId)
        if(!comment){
            res.json({message: "The comment can't be empty!"})
        }

        const newComment = new Comment({
            username: user.username,
            like: 0, 
            dislike: 0,
            comment,
            author: req.userId
        })
        await newComment.save()
        try {
            await Post.findByIdAndUpdate(postId, {
                $push: {comments: newComment._id}
            })
        } catch (error) {
            console.log(error)
        }
        res.json(newComment)
    } catch (error) {
        res.json({message: "Smth going worng!"})
    }
}

export const removeComment = async (req, res) => {
    try {
        const {id, postId} = req.body
        const comment = await Comment.findByIdAndDelete(id)
        if(!comment){
            return res.json({message: "The comment doesn't exist!"})
        }
        await Post.findByIdAndUpdate(postId, {
            $pull: {comments: id}
        })
        res.json({message: "The comment was deleted!"})
    } catch (error) {
        res.json({message: "Smth going worng!"})
    }
}