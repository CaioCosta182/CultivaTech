import { validateRegister, validateLogin } from '../../middlewares/authValidation.js';
import { body, validationResult } from 'express-validator';

describe('Auth Validation Middleware', () => {
  describe('validateRegister', () => {
    it('should pass with valid input', async () => {
      const req = {
        body: {
          name: 'Valid User',
          email: 'valid@example.com',
          password: 'Valid123!'
        }
      };

      for (const validation of validateRegister) {
        if (validation !== validateRegister[validateRegister.length - 1]) {
          await validation(req, {}, () => {});
        }
      }

      const errors = validationResult(req);
      expect(errors.isEmpty()).toBe(true);
    });

    // Adicione testes para cada caso de erro
  });

  // Testes similares para validateLogin
});