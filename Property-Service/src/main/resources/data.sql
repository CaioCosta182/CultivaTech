-- Criação do banco propertydb (executado automaticamente pelo container MySQL)
CREATE DATABASE IF NOT EXISTS propertydb;

USE propertydb;

-- Tabela de propriedades
CREATE TABLE IF NOT EXISTS properties (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL COMMENT 'Coordenadas geográficas (lat,long)',
    area_hectares DECIMAL(10,2) NOT NULL,
    type ENUM('AGRICOLA', 'PECUARIA', 'MISTA') NOT NULL,
    owner_id BIGINT NOT NULL COMMENT 'Referência ao usuário no auth-service',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_owner (owner_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dados iniciais (opcional)
INSERT INTO properties (name, location, area_hectares, type, owner_id) VALUES
('Fazenda São João', '-15.123456,-47.987654', 150.50, 'AGRICOLA', 1),
('Sítio do Vale', '-16.654321,-48.123456', 50.25, 'MISTA', 1),
('Rancho do Boi', '-14.987654,-47.123456', 300.00, 'PECUARIA', 2);