import User from '../models/User.js'
import Comment from '../models/Comment.js'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.json({message: "Smth go wrong"})
    }
}
export const changeAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const username = user.username
        const comments = await Comment.find({username})
        if(!user){
            return res.json({message: "User doesn't exist!"})
        }
        let fileName = Date.now().toString() + 'AVATAR' + req.files.image.name
        const __dirname = dirname(fileURLToPath(import.meta.url))
        req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
        await User.findByIdAndUpdate(req.userId, {
            avatar: fileName
        })
        comments.forEach(async (comment) => {
            await Comment.findByIdAndUpdate(comment._id, {
                icon: fileName
            })
        })
        res.json(fileName)
    } catch (error) {
        res.json({message: "Problem with changing avatar!"})
    }
}

export const getAvatar = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.json({message: "User doesn't exist!"})
        }
        let userAvatar = user.avatar
        res.json(userAvatar)
    } catch (error) {
        res.json({message: "Problem with getting avatar!"})
    }
}

export const resetAvatar = async(req, res) => {
    try {
        const user = await User.findById(req.userId)
        const username = user.username
        const comments = await Comment.find({username})
        if(!user){
            return res.json({message: "User doesn't exist!"})
        }
        const fileName = 'defaultavatar.png'

        await User.findByIdAndUpdate(req.userId, {
            avatar: fileName
        })

        comments.forEach(async (comment) => {
            await Comment.findByIdAndUpdate(comment._id, {
                icon: fileName
            })
        })

        res.json(fileName)
    } catch (error) {
        res.json({message: "Problem with reset avatar!"})
    }
}