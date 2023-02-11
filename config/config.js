module.exports = {
  development: {
    // username: process.env.PGUSER,
    // password: `${process.env.PGPASSWORD}`,
    // database: process.env.PGDATABASE,
    // host: process.env.DATABASE_URL,
    // port: Number(process.env.PGPORT),
    // dialect: "postgres",

    username: "postgres",
    password: "p9u7fnaouXyy6OwQDgPN",
    database: "railway",
    host: "containers-us-west-189.railway.app",
    port: 5443,
    dialect: "postgres",

    // username: "postgres",
    // password: "2562",
    // database: "tech_shop",
    // host: "127.0.0.1",
    // port: 5432,
    // dialect: "postgres",
  },

  production: {
    username: process.env.PGUSER,
    password: `${process.env.PGPASSWORD}`,
    database: process.env.PGDATABASE,
    host: process.env.DATABASE_URL,
    port: Number(process.env.PGPORT),
    dialect: "postgres",
  },
};
