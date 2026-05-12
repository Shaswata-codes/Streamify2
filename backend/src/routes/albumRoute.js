import express from 'express'
import { addAlbum, listAlbum, removeAlbum } from '../controllers/albumController.js'
import upload from '../middleware/multer.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/add', protectAdmin, upload.single('image'), addAlbum) 
router.get('/list', listAlbum)
router.post('/remove', protectAdmin, removeAlbum)  

export default router