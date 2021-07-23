const { Pool } = require('pg')

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "customer",
  password: "XXX"
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}