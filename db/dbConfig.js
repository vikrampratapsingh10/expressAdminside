import mysql from "mysql";

// meta-object
let pool = mysql.createPool({
    connectionLimit: 100,
    user: "root",
    password: "Vikram@123",
    database: "shoesmall",
    host: "localhost"
})

export default pool;