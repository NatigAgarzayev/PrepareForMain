import { Router } from "express"
import { createPost, getAll } from "../controllers/posts.js"
import { checkAuth } from "../utils/checkAuth.js"
const router = new Router() 

//Create post
//http://localhost:4444/api/posts
router.post('/', checkAuth, createPost)

//Get All
//http://localhost:4444/api/posts
router.get('/', getAll)

export default router