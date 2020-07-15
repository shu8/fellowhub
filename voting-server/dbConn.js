const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

let pool;

if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Heroku
    ssl: true,
  });
} else {
  pool = new Pool({ connectionString: process.env.CONNSTRING_DEV });
}

module.exports = pool;

//whoa