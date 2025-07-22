import request from 'supertest';
import app from '../../server.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('Auth API Endpoints', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Password123!'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
    });

    it('should enforce rate limiting on registration', async () => {
      const testUser = (i) => ({
        name: `User ${i}`,
        email: `user${i}@test.com`,
        password: 'Password123!'
      });

      // Faz 20 requisições (limite máximo)
      const requests = Array.from({ length: 20 }, (_, i) => 
        request(app).post('/api/auth/register').send(testUser(i))
      );

      await Promise.all(requests);

      // 21ª requisição deve ser bloqueada
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser(21));
      
      expect(res.statusCode).toEqual(429);
    });

    // Adicione mais testes para casos de erro
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Login Test',
          email: 'login@test.com',
          password: 'Login123!'
        });
    });

    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@test.com',
          password: 'Login123!'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should block after too many login attempts', async () => {
      const credentials = {
        email: 'login@test.com',
        password: 'WrongPassword!'
      };

      // Tenta logar 20 vezes
      for (let i = 0; i < 20; i++) {
        await request(app).post('/api/auth/login').send(credentials);
      }

      const res = await request(app)
        .post('/api/auth/login')
        .send(credentials);
      
      expect(res.statusCode).toEqual(429);
    });
  });

  describe('GET /api/auth/health', () => {
    it('should return service health status', async () => {
      const res = await request(app).get('/api/auth/health');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        status: 'UP',
        timestamp: expect.any(String),
        service: 'auth-service'
      });
    });
  });
});