import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

async function createDatabase() {
    let connexion;
    try {
        connexion = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });

        const databaseName = process.env.DB_NAME;

        await connexion.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);

        await connexion.query(`USE \`${databaseName}\``);

        console.log("Je crées les tables");
        await createTables(connexion);

        const [result] = await connexion.query(`SELECT * FROM companies`);

        if (result.length > 0) {
            console.log("Datas déja présentes en db !")
            return connexion;
        } else {
            console.log("Je popule la db !");
            await populateDatabase(connexion);

            return connexion;
        }
    }
    catch (error) {
            console.error('Erreur lors de la création de la base de données :', error);
        }
    }

async function createTables(connexion) {
    try {
        await connexion.query(`CREATE TABLE IF NOT EXISTS roles
            (
                id
                INT
                AUTO_INCREMENT
                PRIMARY
                KEY,
                name
                VARCHAR
                                   (
                255
                                   ) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );`);

        await connexion.query(`CREATE TABLE IF NOT EXISTS permissions
            (
                id
                INT
                AUTO_INCREMENT
                PRIMARY
                KEY,
                name
                VARCHAR
                                   (
                255
                                   ) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );`);

        await connexion.query(`CREATE TABLE IF NOT EXISTS roles_permissions
            (
                id
                INT
                AUTO_INCREMENT
                PRIMARY
                KEY,
                permission_id
                INT
                NOT
                NULL,
                role_id
                INT
                NOT
                NULL,
                FOREIGN
                KEY
                                   (
                permission_id
                                   ) REFERENCES permissions
                                   (
                                       id
                                   ) ON DELETE CASCADE,
                FOREIGN KEY
                                   (
                                       role_id
                                   ) REFERENCES roles
                                   (
                                       id
                                   )
                                     ON DELETE CASCADE
                );`);

        await connexion.query(`CREATE TABLE IF NOT EXISTS users
            (
                id
                INT
                AUTO_INCREMENT
                PRIMARY
                KEY,
                first_name
                VARCHAR
                                   (
                255
                                   ) NOT NULL,
                last_name VARCHAR
                                   (
                                       255
                                   ) NOT NULL,
                role_id INT NOT NULL,
                email VARCHAR
                                   (
                                       255
                                   ) NOT NULL UNIQUE,
                password VARCHAR
                                   (
                                       255
                                   ) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY
                                   (
                                       role_id
                                   ) REFERENCES roles
                                   (
                                       id
                                   )
                                                              ON DELETE CASCADE
                );`);

        await connexion.query(`CREATE TABLE IF NOT EXISTS types
            (
                id
                INT
                AUTO_INCREMENT
                PRIMARY
                KEY,
                name
                VARCHAR
                                   (
                255
                                   ) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );`);

        await connexion.query(`CREATE TABLE IF NOT EXISTS companies
            (
                id
                INT
                AUTO_INCREMENT
                PRIMARY
                KEY,
                name
                VARCHAR
                                   (
                255
                                   ) NOT NULL,
                type_id INT NOT NULL,
                country VARCHAR
                                   (
                                       255
                                   ),
                tva VARCHAR
                                   (
                                       255
                                   ) NOT NULL UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY
                                   (
                                       type_id
                                   ) REFERENCES types
                                   (
                                       id
                                   )
                                                              ON DELETE CASCADE
                );`);

        await connexion.query(`
            CREATE TABLE IF NOT EXISTS invoices (
                                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                                    ref VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                id_company INT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                due_date DATETIME NOT NULL,
                FOREIGN KEY (id_company) REFERENCES companies(id) ON DELETE CASCADE
                )
        `);

        await connexion.query(`CREATE TABLE IF NOT EXISTS contacts
            (
                id
                INT
                AUTO_INCREMENT
                PRIMARY
                KEY,
                name
                VARCHAR
                                   (
                255
                                   ) NOT NULL,
                company_id INT NOT NULL,
                email VARCHAR
                                   (
                                       255
                                   ) NOT NULL UNIQUE,
                phone VARCHAR
                                   (
                                       255
                                   ),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY
                                   (
                                       company_id
                                   ) REFERENCES companies
                                   (
                                       id
                                   )
                                                              ON DELETE CASCADE
                );`);
        console.log("Tables crées avec succès !");
        return connexion;
    } catch (error) {
        console.log(error.message);
    }
}

async function populateDatabase(connexion) {
        try {
            await connexion.query(`
                INSERT INTO roles (name)
                VALUES ('Admin'),
                       ('Manager'),
                       ('Employé'),
                       ('Client'),
                       ('Comptable')
            `);

            await connexion.query(`
                INSERT INTO permissions (name)
                VALUES ('Créer utilisateur'),
                       ('Supprimer utilisateur'),
                       ('Modifier entreprise'),
                       ('Gérer factures'),
                       ('Consulter rapports')
            `);

            await connexion.query(`
                INSERT INTO roles_permissions (permission_id, role_id)
                VALUES (1, 1),
                       (2, 1),
                       (3, 2),
                       (4, 3),
                       (5, 4)
            `);

            await connexion.query(`
                INSERT INTO types (name)
                VALUES ('SARL'),
                       ('SA'),
                       ('Auto-entrepreneur'),
                       ('Association'),
                       ('Startup')
            `);

            await connexion.query(`
                INSERT INTO companies (name, type_id, country, tva)
                VALUES ('TechCorp', 1, 'Belgium', 'BE1234567890'),
                       ('GreenEnergy', 2, 'France', 'FR9876543210'),
                       ('Foodies', 3, 'Germany', 'DE1122334455'),
                       ('BuildIt', 4, 'Spain', 'ES5566778899'),
                       ('AI Solutions', 5, 'Italy', 'IT6655443322')
            `);

            await connexion.query(`
                INSERT INTO contacts (name, company_id, email, phone)
                VALUES ('Alice Dupont', 1, 'alice@techcorp.com', '+32471234567'),
                       ('Jean Martin', 2, 'jean@greenenergy.com', '+33698765432'),
                       ('Maria Schmidt', 3, 'maria@foodies.de', '+491765432198'),
                       ('Carlos Rodriguez', 4, 'carlos@buildit.es', '+34612345678'),
                       ('Luigi Verdi', 5, 'luigi@aisolutions.it', '+393987654321')
            `);

            await connexion.query(`
                INSERT INTO invoices (ref, price, id_company, due_date)
                VALUES
                    ('INV-1001', 199.99, 1, DATE_ADD(NOW(), INTERVAL 2 YEAR)),
                    ('INV-1002', 349.50, 2, DATE_ADD(NOW(), INTERVAL 2 YEAR)),
                    ('INV-1003', 125.75, 3, DATE_ADD(NOW(), INTERVAL 2 YEAR)),
                    ('INV-1004', 210.00, 4, DATE_ADD(NOW(), INTERVAL 2 YEAR)),
                    ('INV-1005', 99.99, 5, DATE_ADD(NOW(), INTERVAL 2 YEAR));`);

            console.log(`Base de données remplie avec succès !`);

        } catch (error) {
            console.log(error.message);
        }
    }

const connexion = await createDatabase();

export default connexion;
