import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comment.js'
import profileRoute from './routes/profile.js'
import followersRoute from './routes/followers.js'
import resetRoute from './routes/reset.js'
import fileUpload from "express-fileupload"
import bodyParser from "body-parser"
const app = express()
dotenv.config()

//Midllerware
app.use(cors())
app.use(fileUpload())
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('uploads'))
//Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)
app.use('/api/profile', profileRoute)
app.use('/api/followers', followersRoute)
app.use('/api/reset', resetRoute)


const start = async () => {
    try {
        mongoose.set('strictQuery', false)
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