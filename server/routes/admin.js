import { Router } from "express"
import {adminAuth, getAdmin} from '../controllers/admin.js'
import { adminHere } from "../utils/adminHere.js"
const router = new Router

//admin login
router.post('/auth', adminAuth)

//get admin
router.get('/me', adminHere, getAdmin)

export default router