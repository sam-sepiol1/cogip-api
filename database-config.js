import mysql from 'mysql2/promise';
import dotenv from "dotenv";


dotenv.config();

async function createDatabase() {
    let connexion;
    try {
        connexion = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });

        const databaseName = process.env.DB_NAME;

        await connexion.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);

        await connexion.query(`USE \`${databaseName}\``);

        await connexion.query(`CREATE TABLE roles (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);

        await connexion.query(`CREATE TABLE permissions (
                             id INT AUTO_INCREMENT PRIMARY KEY,
                             name VARCHAR(255) NOT NULL,
                             created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                             updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);

        await connexion.query(`CREATE TABLE roles_permissions (
                                   id INT AUTO_INCREMENT PRIMARY KEY,
                                   permission_id INT NOT NULL,
                                   role_id INT NOT NULL,
                                   FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
                                   FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
        );`);

        await connexion.query(`CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       first_name VARCHAR(255) NOT NULL,
                       last_name VARCHAR(255) NOT NULL,
                       role_id INT NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                       FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
        );`);

        await connexion.query(`CREATE TABLE types (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);

        await connexion.query(`CREATE TABLE companies (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           type_id INT NOT NULL,
                           country VARCHAR(255),
                           tva VARCHAR(255) NOT NULL UNIQUE,
                           created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                           updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                           FOREIGN KEY (type_id) REFERENCES types(id) ON DELETE CASCADE
        );`);

        await connexion.query(`CREATE TABLE invoices (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          ref VARCHAR(255) NOT NULL,
                          id_company INT NOT NULL,
                          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          FOREIGN KEY (id_company) REFERENCES companies(id) ON DELETE CASCADE
        );`);

        await connexion.query(`CREATE TABLE contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            company_id INT NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            phone VARCHAR(255),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
        );`);

    } catch (error) {
        console.error('Erreur lors de la création de la base de données :', error);
    }
}

const connexion = await createDatabase();

export default connexion;