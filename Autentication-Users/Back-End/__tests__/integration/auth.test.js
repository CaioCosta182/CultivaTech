// Autentication-Users/Back-End/tests/integration/auth.test.js

const request = require("supertest");
const express = require("express");
const authRoutes = require("../../routes/authRoutes");
const { pool } = require("../../config/database");
const bcrypt = require("bcryptjs");

// Configura um app Express de teste
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

// Mock automático dos módulos
jest.mock("../../config/database");
jest.mock("bcryptjs");

describe("Integration Tests: Auth API Endpoints", () => {
  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste para evitar que um teste interfira no outro
    jest.clearAllMocks();
  });

  // Testes do Endpoint de Registro
  describe("POST /api/auth/register", () => {
    it("deve registrar um novo usuário e retornar um token", async () => {
      const userData = {
        name: "Integration User",
        email: "integration@test.com",
        password: "Password123",
        cpfCnpj: "11122233344",
        phone: "11987654321",
        profileType: "PF",
      };

      pool.query
        .mockResolvedValueOnce([[]]) // Simula que o email não existe
        .mockResolvedValueOnce([{ insertId: 99 }]); // Simula o sucesso da inserção

      bcrypt.hash.mockResolvedValue("hashedPassword");

      const res = await request(app).post("/api/auth/register").send(userData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user.name).toBe("Integration User");
    });

    it("deve retornar 400 para dados de registro inválidos (senha curta)", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Short Pass",
        email: "short@pass.com",
        password: "123",
        cpfCnpj: "11122233344",
        phone: "11987654321",
        profileType: "PF",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors[0].msg).toContain(
        "Senha deve ter no mínimo 8 caracteres"
      );
    });
  });

  // Testes do Endpoint de Login
  describe("POST /api/auth/login", () => {
    it("deve fazer login com credenciais corretas e retornar token", async () => {
      const mockUser = {
        id: 1,
        name: "Login User",
        email: "login@test.com",
        password: "hashedPassword",
      };
      pool.query.mockResolvedValue([[mockUser]]);
      bcrypt.compare.mockResolvedValue(true); // Simula que a senha bate

      const res = await request(app).post("/api/auth/login").send({
        email: "login@test.com",
        password: "Password123",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
    });

    it("deve retornar 401 para credenciais incorretas", async () => {
      pool.query.mockResolvedValue([[]]); // Simula usuário não encontrado

      const res = await request(app).post("/api/auth/login").send({
        email: "wrong@test.com",
        password: "wrongpassword",
      });

      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toBe("Credenciais inválidas");
    });
  });

  // Teste do Endpoint de Health Check
  describe("GET /api/auth/health", () => {
    it("deve retornar o status de saúde do serviço", async () => {
      const res = await request(app).get("/api/auth/health");

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe("UP");
      expect(res.body.service).toBe("auth-service");
    });
  });
});
