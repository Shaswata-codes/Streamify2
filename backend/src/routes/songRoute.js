import { addSongs, listSongs, removeSong } from "../controllers/songController.js";
import express from "express";
import upload from '../middleware/multer.js'
import { protectAdmin } from '../middleware/authMiddleware.js';

const songRouter = express.Router();

songRouter.post("/add",    protectAdmin, upload.fields([{ name: "image", maxCount: 1 }, { name: "audio", maxCount: 1 }]), addSongs);
songRouter.get("/list",    listSongs);
songRouter.post("/remove", protectAdmin, removeSong);

export default songRouter;