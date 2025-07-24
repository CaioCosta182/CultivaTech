const { body, validationResult } = require("express-validator");

const authValidation = {
  registerValidation: [
    body("email").isEmail().withMessage("Email inválido").normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Senha deve ter no mínimo 8 caracteres")
      .matches(/\d/)
      .withMessage("Senha deve conter um número")
      .matches(/[A-Z]/)
      .withMessage("Senha deve conter uma letra maiúscula"),
    body("name").notEmpty().withMessage("Nome é obrigatório").trim().escape(),
    body("cpfCnpj")
      .notEmpty()
      .withMessage("CPF/CNPJ é obrigatório")
      .isLength({ min: 11, max: 14 })
      .withMessage("CPF/CNPJ inválido"),
    body("profileType")
      .isIn(["PF", "PJ"])
      .withMessage("Tipo de perfil inválido (deve ser PF ou PJ)"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  loginValidation: [
    body("email").isEmail().withMessage("Email inválido").normalizeEmail(),
    body("password").notEmpty().withMessage("Senha é obrigatória"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};

module.exports = authValidation;
