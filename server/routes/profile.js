import { Router } from "express"
import { checkAuth } from "../utils/checkAuth.js"
import { getUserById, changeAvatar, getAvatar, resetAvatar } from "../controllers/profile.js"
const router = new Router() 

//get user by id
router.get('/:id', getUserById)

//change user avatar
router.post('/avatar/', checkAuth, changeAvatar)

//get user avatar
router.get('/avatar/:id', getAvatar)

//reset user avatar
router.post('/avatar/:id', checkAuth, resetAvatar)
export default router