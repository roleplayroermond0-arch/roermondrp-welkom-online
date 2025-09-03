-- MySQL Database Schema for RoermondRP
-- Run this to set up your database

CREATE DATABASE IF NOT EXISTS roermondRP;
USE roermondRP;

-- Users table for Discord user data
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    discord_id VARCHAR(20) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User balances table
CREATE TABLE user_balances (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    munten INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Applications table for job applications
CREATE TABLE applications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    job_id VARCHAR(50) NOT NULL,
    applicant_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    application_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Purchases table for store transactions
CREATE TABLE purchases (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    package_id INT NOT NULL,
    amount INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_users_discord_id ON users(discord_id);
CREATE INDEX idx_user_balances_user_id ON user_balances(user_id);
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_purchases_user_id ON purchases(user_id);