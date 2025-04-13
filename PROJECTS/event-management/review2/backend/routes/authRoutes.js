import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Register Organizer
router.post("/register", registerUser);

// Login Organizer
router.post("/login", loginUser);

router.post("/signup", registerUser);

export default router;
