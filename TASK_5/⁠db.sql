CREATE DATABASE payment_db;
USE payment_db;

CREATE TABLE accounts (
    account_id INT PRIMARY KEY,
    name VARCHAR(50),
    balance DECIMAL(10,2)
);

INSERT INTO accounts VALUES
(1, 'User', 1000),
(2, 'Merchant', 500);
