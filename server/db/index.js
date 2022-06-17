require('dotenv').config();
// console.log(process.env);

const { Pool } = require('pg')
const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
  // max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0
});

pool
  .connect()
  .then(() => {
    console.log('Host:', process.env.HOST)
    console.log('PostgreSQL was Connected!');
  })
  .catch((err) => console.log('Unexpected error', err))

pool
  .query('SELECT NOW()')
  .then(res => console.log(res.rows[0].now))
  .catch(err => console.error('Error executing query', err.stack));

module.exports = pool;