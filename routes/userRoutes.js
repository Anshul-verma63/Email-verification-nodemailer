import express from "express";
import {
  userRegistration,
  verifyEmail,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", userRegistration);
router.get("/verify/:userid", verifyEmail);

export default router;
