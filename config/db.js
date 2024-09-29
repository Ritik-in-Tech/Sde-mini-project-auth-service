import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let pool;

const createTcpPool = async (config = {}) => {
  if (!pool) {
    const dbConfig = {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ...config,
    };

    try {
      pool = await mysql.createPool(dbConfig);
      console.log("Connected to the database successfully.");

      await createUsersTable(pool);
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error;
    }
  }
  return pool;
};

const createUsersTable = async (pool) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Users table created or already exists.");
  } catch (error) {
    console.error("Error creating users table:", error);
    throw error;
  }
};

const closePool = async () => {
  if (pool) {
    await pool.end();
    pool = null;
    console.log("Database connection pool closed.");
  }
};

export { createTcpPool, closePool };
