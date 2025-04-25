import express from "express";
import { login, protect } from "../controllers/authController";

const router = express.Router();

router.post("/login", login);
// Exemplo de rota protegida:
// router.get('/profile', protect, getProfile);

export default router;
