import { Router } from "express"
import {
    adminAuth,
    getAdmin,
    getStat,
    deleteUser,
    changeRole,
    changeStatus,
    createNotification,
} from '../controllers/admin.js'
import { adminHere } from "../utils/adminHere.js"
import {checkAuth} from '../utils/checkAuth.js'
const router = new Router

//admin login
router.post('/auth', adminAuth)

//get admin
router.get('/me', adminHere, getAdmin)

//get user 
router.get('/stats', adminHere, getStat)

//delete user 
router.delete('/user/delete/:id', adminHere, deleteUser)

//change role
router.post('/user/role', adminHere, changeRole)

//change status
router.post('/user/status', adminHere, changeStatus)

//create notification
router.post('/notification',adminHere, createNotification)

export default router