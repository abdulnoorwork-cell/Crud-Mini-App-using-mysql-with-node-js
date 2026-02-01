import mysql from 'mysql';
import 'dotenv/config'

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT || 3306,
})

db.connect((err)=> { 
    if(err) {
        console.log("Database connection " +  err)
    } else {
        console.log(`Connected to Database: ` + process.env.DATABASE)
    }

})

export default db;