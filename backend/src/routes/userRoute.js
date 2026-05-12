import express from "express";
import {
    userSignup,
    userLogin,
    toggleLikeSong,
    getLikedSongs
} from "../controllers/userController.js";
import { protectUser } from "../middleware/protectUser.js"


const router = express.Router();
router.get("/verify", protectUser, (req, res) => {
    res.json({
      success: true,
      user: req.user
    })
  })

router.post("/signup", userSignup);
router.post("/login",  userLogin);
router.post("/like-song", toggleLikeSong);
router.get("/liked-songs/:userId", getLikedSongs);

export default router;