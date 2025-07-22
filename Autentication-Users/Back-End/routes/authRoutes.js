const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authValidation = require('../middlewares/authValidation');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Configuração do rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // Limite de 20 requisições por IP
  message: 'Too many requests from this IP, please try again later'
});

// Middlewares de segurança
router.use(helmet());
router.use(express.json({ limit: '10kb' })); // Limita tamanho do payload

// Rotas de autenticação
router.post("/login", 
  authLimiter, 
  authValidation.loginValidation, 
  authController.login
);

router.post("/register", 
  authLimiter, 
  authValidation.registerValidation, 
  authController.register
);

// Rota de health check
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
    service: "auth-service"
  });
});

module.exports = router;