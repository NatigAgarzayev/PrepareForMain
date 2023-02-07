import { Router } from "express"
import { createPost, getPosts } from "../controllers/posts.js"
import { checkAuth } from "../utils/checkAuth.js"
const router = new Router() 

//Create post
//http://localhost:4444/api/posts
router.post('/', checkAuth, createPost)


//all posts
router.get('/', getPosts)

export default router