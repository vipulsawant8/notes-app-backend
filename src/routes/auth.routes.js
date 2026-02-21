import { Router } from "express";

import { getMe, loginUser, logoutUser, createAccount, verifyEmail, refreshAccessToken } from "../controllers/auth.controller.js";
import verifyLogin from "../middlewares/auth/verifyLogin.js";
import { createdUserLimiter, verifyEmailLimiter, loginLimiter, changePasswordLimiter, forgotPasswordLimiter  } from "../middlewares/limiters/setLimiters.js";

const router = Router();

router.post('/create-account', createdUserLimiter, createAccount);
router.get('/verify-email', verifyEmailLimiter, verifyEmail);

router.post('/login', loginLimiter, loginUser);
router.post('/logout', logoutUser);

router.get('/me', verifyLogin, getMe);
router.post('/refresh-token', refreshAccessToken);

export default router;