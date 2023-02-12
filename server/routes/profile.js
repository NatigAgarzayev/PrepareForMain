import { Router } from "express"
import { getUserById } from "../controllers/profile.js"
const router = new Router() 

//get user by id
router.get('/:id', getUserById)

export default router