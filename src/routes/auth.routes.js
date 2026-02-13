import { Router } from "express";

import { sendOtp, getMe, loginUser, logoutUser, registerUser, refreshAccessToken, verifyOtp } from "../controllers/auth.controller.js";
import verifyLogin from "../middlewares/auth/verifyLogin.js";

const router = Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyLogin, logoutUser);

router.get('/me', verifyLogin, getMe);
router.post('/refresh-token', refreshAccessToken);

export default router;