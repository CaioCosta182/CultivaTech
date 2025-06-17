CREATE DATABASE IF NOT EXISTS cultivatech;
USE cultivatech;

CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
cpf_cnpj VARCHAR(20) NOT NULL,
phone VARCHAR(15) NOT NULL,
profile_type ENUM('PF', 'PJ') NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, cpf_cnpj, phone, profile_type) VALUES
('João Silva', 'joao@email.com', '$2a$10$7uYFmjw1dCSXXHtJc5G8UOmi2Bq6zTZFoyziUzEr3wrRbPAMX6MVa', '12345678901', '31999999999', 'PF'),
('Empresa XPTO', 'contato@xpto.com', '$2a$10$D1zXq0OsEr09h9i0eMiEQOmMxD8p5l74O9CeuXKpxUflQp/JkjphK', '12345678000199', '1133334444', 'PJ');