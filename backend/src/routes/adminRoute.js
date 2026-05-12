import express from "express";
import { adminLogin, adminSignup, verifyAdmin } from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.get("/verify", protectAdmin, verifyAdmin);  

export default router;