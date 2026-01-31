import express from 'express'
import 'dotenv/config'
import '../config/dbConnection.js'
import cors from 'cors'
const app = express();
const Port = process.env.PORT;
import customerRoutes from '../routes/customer.routes.js'

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
const allowedOrigins = [
    process.env.FRONTEND_URL
]
const corsOptions = {
    origin: function (origin, callback) {
        if(allowedOrigins.indexOf(origin !== -1) || !origin){
            callback(null, true)
        } else {
            callback(new Error("Not allowed by cors"))
        }
    },
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true
}
app.use(cors(corsOptions));
app.use('/api/customer', customerRoutes);

app.get('/', (req, res) => {
    res.status(200).json("Response from the server")
})

export default app;