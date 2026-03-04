import { Client } from "pg";
// const Pool = require("pg-pool");

// const config = {
//   host: process.env.POSTGRES_HOST,
//   port: process.env.POSTGRES_PORT,
//   user: process.env.POSTGRES_USER,
//   database: process.env.POSTGRES_DB,
//   password: process.env.POSTGRES_PASSWORD,
//   ssl: false,
//   max: 20, // set pool max size to 20
//   idleTimeoutMillis: 1000, // close idle clients after 1 second
//   connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
//   maxUses: 7500,
// };

// const pool = new Pool(config);
const postgresConfig = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
};

async function query(queryObject) {
  const client = new Client(postgresConfig);

  console.log("CREDENCIAS POSTGRES:", postgresConfig);

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
