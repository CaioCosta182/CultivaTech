// Autentication-Users/Back-End/__mocks__/mysql2/promise.js

// Este mock simula a biblioteca mysql2/promise
const mysql = jest.createMockFromModule("mysql2/promise");

const mockPool = {
  query: jest.fn(),
  getConnection: jest.fn().mockReturnThis(),
  ping: jest.fn().mockResolvedValue(true),
  release: jest.fn(),
};

mysql.createPool = jest.fn(() => mockPool);

module.exports = mysql;
