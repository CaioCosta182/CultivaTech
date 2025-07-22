import express from "express";
import { login, register } from "../controllers/authController.js";
import { validateLogin, validateRegister } from "../middlewares/authValidation.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const router = express.Router();

// Middlewares de segurança
router.use(helmet());
router.use(express.json({ limit: '10kb' })); // Limita tamanho do payload

// Rate limiting para prevenir brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // Limite de 20 requisições por IP
  message: 'Too many requests from this IP, please try again later'
});

// Rotas de autenticação
router.post("/login", 
  authLimiter,
  validateLogin, 
  login
);

router.post("/register", 
  authLimiter,
  validateRegister,
  register
);

// Rota de health check para o Eureka
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
    service: "auth-service"
  });
});

export default router;