/**
 * One-time setup script:
 *  1. Runs db/schema.sql (creates the database + tables if missing)
 *  2. Runs db/seed.sql   (inserts the starting content — safe to re-run)
 *  3. Creates the first admin user from your .env values (if it
 *     doesn't already exist)
 *
 * Usage:
 *   npm run db:setup
 */
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function run() {
  const {
    DB_HOST = "localhost",
    DB_PORT = 3306,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    ADMIN_USERNAME,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
  } = process.env;

  let connection;

  try {
    console.log(`Connecting to MySQL at ${DB_HOST}:${DB_PORT} ...`);
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    });

    const schemaPath = path.join(__dirname, "..", "db", "schema.sql");
    const schema = await fs.promises.readFile(schemaPath, "utf8");
    console.log("Running schema.sql ...");
    await connection.query(schema);

    await connection.changeUser({ database: DB_NAME });

    const [[{ count }]] = await connection.query(
      "SELECT COUNT(*) AS count FROM `services`"
    ).catch(() => [[{ count: 0 }]]);

    if (count > 0) {
      console.log("Seed data already present — skipping seed.sql.");
    } else {
      const seedPath = path.join(__dirname, "..", "db", "seed.sql");
      const seed = await fs.promises.readFile(seedPath, "utf8");
      console.log("Running seed.sql ...");
      await connection.query(seed);
    }

    console.log("Checking for an existing admin user ...");
    const [rows] = await connection.query(
      "SELECT id FROM `admins` WHERE username = ? OR email = ?",
      [ADMIN_USERNAME, ADMIN_EMAIL]
    );

    if (rows.length > 0) {
      console.log(`Admin "${ADMIN_USERNAME}" already exists — skipping.`);
    } else {
      const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await connection.query(
        "INSERT INTO `admins` (username, email, password_hash) VALUES (?, ?, ?)",
        [ADMIN_USERNAME, ADMIN_EMAIL, hash]
      );
      console.log(`Created admin user "${ADMIN_USERNAME}".`);
      console.log("Log in at /admin/login with the username/password from your .env file.");
    }

    console.log("Done.");
  } catch (err) {
    console.log(err);
    console.error("Setup failed:", err.message);
    process.exitCode = 1;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

run();