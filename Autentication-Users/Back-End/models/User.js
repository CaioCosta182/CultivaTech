import pool from '../config/db.js'; // sua conexão MySQL

export const createUser = async ({ name, email, password, cpfCnpj, phone, profileType }) => {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, cpf_Cnpj, phone, profile_type) VALUES (?, ?, ?, ?, ?, ?)',
    [name, email, password, cpfCnpj, phone, profileType]
  );
  return result.insertId;
};

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};
