import Post from '../models/Post.js'
import User from '../models/User.js'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

//Create post
export const createPost = async (req, res) => {
    try {
        const {title, text} = req.body
        const user = await User.findById(req.userId)

        if(req.files){
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imageUrl: fileName,
                author: req.userId
            })
            await newPostWithImage.save()
            await User.findOneAndUpdate(req.userId, {
                $push: {posts: newPostWithImage}
            })

            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imageUrl,
            author: req.userId,
        })
        await newPostWithoutImage.save()
        await User.findOneAndUpdate(req.userId, {
            $push: {posts: newPostWithoutImage}
        })

        res.json(newPostWithoutImage)
    } catch (error) {
        res.json({message: "Something go wrong!"})
    }
}

//Get all posts
export const getPosts = async (req, res) => {
    const posts = await Post.find()
    res.json(posts)
}