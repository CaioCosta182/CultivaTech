// Autentication-Users/Back-End/tests/unit/authController.test.js

const authController = require("../../controllers/authController");
const pool = require("../../config/database").pool;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Mock das dependências
jest.mock("../../config/database");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("Unit Tests: Auth Controller", () => {
  let req, res, next;

  beforeEach(() => {
    // Reseta os mocks antes de cada teste
    jest.clearAllMocks();

    req = {
      body: {},
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  // Testes para a função de Registro
  describe("register", () => {
    it("deve registrar um novo usuário com sucesso", async () => {
      req.body = {
        name: "Test User",
        email: "test@example.com",
        password: "Password123",
        cpfCnpj: "12345678901",
        phone: "11999999999",
        profileType: "PF",
      };

      pool.query
        .mockResolvedValueOnce([[]]) // Simula que o email não existe
        .mockResolvedValueOnce([{ insertId: 1 }]); // Simula a inserção
      bcrypt.hash.mockResolvedValue("hashedPassword");
      jwt.sign.mockReturnValue("fakeToken");

      await authController.register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith("Password123", 12);
      expect(pool.query).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          token: "fakeToken",
          user: expect.objectContaining({ id: 1, email: "test@example.com" }),
        })
      );
    });

    it("deve retornar erro 400 se o email já existir", async () => {
      req.body = { email: "existing@example.com", password: "password" };
      pool.query.mockResolvedValue([[{ id: 1 }]]); // Simula que o email já existe

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Email já cadastrado" });
    });
  });

  // Testes para a função de Login
  describe("login", () => {
    it("deve fazer login com credenciais válidas", async () => {
      req.body = { email: "user@example.com", password: "password" };
      const mockUser = {
        id: 1,
        name: "User",
        email: "user@example.com",
        password: "hashedPassword",
      };

      pool.query.mockResolvedValue([[mockUser]]);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("fakeToken");

      await authController.login(req, res);

      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
        "user@example.com",
      ]);
      expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedPassword");
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ token: "fakeToken" })
      );
    });

    it("deve retornar erro 401 para senha incorreta", async () => {
      req.body = { email: "user@example.com", password: "wrongpassword" };
      const mockUser = { password: "hashedPassword" };

      pool.query.mockResolvedValue([[mockUser]]);
      bcrypt.compare.mockResolvedValue(false); // A senha não confere

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Credenciais inválidas" });
    });
  });

  // Testes para o middleware de Proteção de Rotas
  describe("protect middleware", () => {
    it("deve autorizar com um token válido", async () => {
      req.headers.authorization = "Bearer validToken";
      jwt.verify.mockReturnValue({ id: 1 });
      const mockUser = { id: 1, name: "User", email: "user@example.com" };
      pool.query.mockResolvedValue([[mockUser]]);

      await authController.protect(req, res, next);

      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled(); // Verifica se o middleware chamou next()
    });

    it("deve retornar erro 401 se não houver token", async () => {
      await authController.protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Não autorizado" });
    });
  });
});
