import mysql from 'mysql';
import 'dotenv/config'

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.connect((err)=> { 
    if(err) {
        console.log("Database connection error: " +  err)
    } else {
        console.log(`Connected to Database: ` + process.env.DATABASE)
    }

})

export default db;