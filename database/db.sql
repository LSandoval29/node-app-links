CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users(
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(60) not null,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

CREATE TABLE links (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

