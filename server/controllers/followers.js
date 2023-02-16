import User from '../models/User.js'


export const doFollow = async(req, res) => {
    try {
        console.log(req.userId, req.params.id)
        const user = await User.findById(req.params.id)
        if(!user){
            return res.json({message: "This user doesn't exist!"})
        }
        const followers = await User.findByIdAndUpdate(req.params.id, {
            $push: {followers: req.userId}
        })
        res.json(followers.followers)
    } catch (error) {
        res.json({message: "You can't follow!"})
    }
} 

export const getFollow = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.json({message: "This user doesnt exist!"})
        }
        const userFollowers = user.followers
        res.json(userFollowers)
    } catch (error) {
        res.json({message: "We can't get followers!"})
    }
}

export const unFollow = async(req, res) => {
    try {
        console.log(req.userId, req.params.id)
        const user = await User.findById(req.params.id)
        if(!user){
            return res.json({message: "This user doesn't exist!"})
        }
        await User.findByIdAndUpdate(req.params.id, {
            $pull: {followers: req.userId}
        })
        res.json({message: "You follow to this user!"})
    } catch (error) {
        res.json({message: "You can't follow!"})
    }
} 