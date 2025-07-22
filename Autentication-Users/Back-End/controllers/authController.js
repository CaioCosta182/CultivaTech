const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/database");
const { validationResult } = require('express-validator');

// Helper function
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Controller methods
const authController = {
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

      if (rows.length === 0) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const token = generateToken(user.id);

      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ 
        error: "Erro no servidor",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },

  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, cpfCnpj, phone, profileType } = req.body;
      const [existingUser] = await pool.query(
        "SELECT id FROM users WHERE email = ?", 
        [email]
      );

      if (existingUser.length > 0) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const [result] = await pool.query(
        `INSERT INTO users (name, email, password, cpf_cnpj, phone, profile_type)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, email, hashedPassword, cpfCnpj, phone, profileType]
      );

      const token = generateToken(result.insertId);

      res.status(201).json({
        user: {
          id: result.insertId,
          name,
          email,
          cpfCnpj,
          phone,
          profileType
        },
        token
      });
    } catch (error) {
      console.error("Erro no registro:", error);
      
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: "Email já cadastrado" });
      }
      
      res.status(500).json({ 
        error: "Erro no servidor",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  protect: async (req, res, next) => {
    try {
      let token;
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
      }

      if (!token) {
        return res.status(401).json({ error: "Não autorizado" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const [rows] = await pool.query(
        "SELECT id, name, email FROM users WHERE id = ?",
        [decoded.id]
      );

      if (rows.length === 0) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

      req.user = rows[0];
      next();
    } catch (error) {
      res.status(401).json({ error: "Token inválido" });
    }
  }
};

module.exports = authController;