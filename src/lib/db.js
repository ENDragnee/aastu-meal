// lib/db.js
import mysql from 'mysql2/promise'

export async function getConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: "END",
    password: "1234",
    database: "aastuMeal"
  })
}