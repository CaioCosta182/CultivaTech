import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pool from "../config/db";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Busca usuário no MySQL
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const user = rows[0];

    // 2. Verifica senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // 3. Gera token JWT
    const token = generateToken(user.id);

    // 4. Retorna resposta
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
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Verifica se usuário já existe
    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // 2. Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Insere novo usuário
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // 4. Gera token para o novo usuário
    const token = generateToken(result.insertId);

    res.status(201).json({
      user: {
        id: result.insertId,
        name,
        email,
      },
      token,
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  try {
    // Verifica token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Busca usuário no banco
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
};
