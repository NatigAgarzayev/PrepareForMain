import Comment from "../models/Comment.js"
import Post from "../models/Post.js"
import User from '../models/User.js'

export const createComment = async (req, res) => {
    try {
        const {postId, comment, parentId} = req.body
        const user = await User.findById(req.userId)
        if(!comment){
            res.json({message: "The comment can't be empty!"})
        }

        const newComment = new Comment({
            username: user.username,
            comment,
            parentId,
            author: req.userId,
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
        res.json({message: "Couldn't create the post :("})
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
        res.json({message: "Couldn't remove the post :(!"})
    }
}

export const likeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if(!comment){
            return res.json({message: "Comment doesn't exist!"})
        }
        await Comment.findByIdAndUpdate(req.params.id, {
            $push: {likes: req.userId}
        })
        res.json({message: "You liked it!"})
    } catch (error) {
        res.json({message: "Couldn't like the post :("})
    }
}

export const unlikeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if(!comment){
            return res.json({message: "Comment doesn't exist!"})
        }
        await Comment.findByIdAndUpdate(req.params.id, {
            $pull: {likes: req.userId}
        })
        res.json({message: "You unliked it!"})
    } catch (error) {
        res.json({message: "Couldn't like the post :("})
    }
}