import { Router } from "express";
import {
  loginUser,
  registerUser,
  resendOtp,
  resetPassword,
  sendPasswordResetEmail,
  verifyOtp,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/verify-otp",verifyOtp);
router.post("/resend-otp",resendOtp);

router.post("/send-password-reset-email", sendPasswordResetEmail);
router.patch("/reset-password", resetPassword);

export default router;
