import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'
const app = express()
dotenv.config()

//Midllerware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth', authRoute)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
            .then(() => console.log('DB is active..'))
        app.listen(process.env.PORT, () => {
            console.log('Server is active..')
        })
    } catch (error) {
        console.log(error)
    }
}

start()