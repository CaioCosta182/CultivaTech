CREATE TABLE IF NOT EXISTS cultivares (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    species VARCHAR(255) NOT NULL,
    planting_season VARCHAR(100) NOT NULL,
    harvest_days INT
);
