import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const adminAuth = async(req, res) => {
    try {
        const {username, password} = req.body 
        const admin = await User.findOne({username})
        if(!admin){
            return res.json({message: "User doesn't exist!"})
        }
        if(admin.role !== 'ADMIN'){
            return res.json({message: "This user is NOT admin!!"})
        }

        const isPassCorrect = await bcrypt.compare(password, admin.password)

        if(!isPassCorrect){
            return res.json({message: "The passwor is not correct!!"})
        }

        const token = jwt.sign(
            {
                id: admin._id
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.json({
            token,
            admin,
            message: "You are logged in as ADMIN!"
        })

    } catch (error) {
        res.json({message: "Admin login error!"})
    }
}

export const getAdmin = async(req, res) => {
    try {
        const admin = await User.findById(req.adminId)
        if(!admin){
            return res.json({message: "This user doesn't exist!"})
        }

        const token = jwt.sign(
            {
                id: admin._id
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.json({
            admin,
            token
        })

    } catch (error) {
        res.json({message: "Error getting ADMIN!"})
    }
}