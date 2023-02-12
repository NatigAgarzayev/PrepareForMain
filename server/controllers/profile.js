import User from '../models/User.js'
import Comment from '../models/Comment.js'
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.json({message: "Smth go wrong"})
    }
}