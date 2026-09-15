import mysql from "mysql2/promise";

// Lazily-created singleton connection pool. Using a pool (instead of a
// single connection) lets Next.js handle many concurrent requests safely,
// and lazy creation means the app doesn't crash at build/import time if
// the database isn't reachable yet (e.g. during `next build`).

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "skynex",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      dateStrings: true,
    });
  }
  return pool;
}

/**
 * Run a SQL query against the pool.
 * @param {string} sql
 * @param {Array<any>} params
 * @returns {Promise<any>} rows (or result for INSERT/UPDATE/DELETE)
 */
export async function query(sql, params = []) {
  const [rows] = await getPool().query(sql, params);
  return rows;
}

/**
 * Run several statements against a single connection wrapped in a
 * transaction. `fn` receives a `run(sql, params)` helper bound to that
 * connection and must return a value to commit.
 */
export async function transaction(fn) {
  const connection = await getPool().getConnection();
  try {
    await connection.beginTransaction();
    const run = async (sql, params = []) => {
      const [rows] = await connection.query(sql, params);
      return rows;
    };
    const result = await fn(run);
    await connection.commit();
    return result;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

export default { query, transaction };
