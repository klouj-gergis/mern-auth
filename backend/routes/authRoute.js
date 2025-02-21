
import { Router } from "express";
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const routes = new Router();

routes.get('/check-auth', verifyToken, checkAuth)
routes.post('/login', login)
routes.post('/signup', signup)
routes.post('/logout', logout)
routes.post('/verify-email', verifyEmail)
routes.post('/forgot-password', forgotPassword)
routes.post('/reset-password/:token', resetPassword)
