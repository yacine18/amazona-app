import express from 'express'
import multer from 'multer'
import { isAdmin, isAuth } from '../utils.js'

const uploadRouter = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`)
    }
})

const upload = multer({ storage })

uploadRouter.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default uploadRouter