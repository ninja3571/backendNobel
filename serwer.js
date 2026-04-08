// Główne ciało backendu
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import laureatesRoute from "./routes/laureates.js"
import statsRoute from "./routes/stats.js"
import mapRoute from "./routes/map.js"
import { connectDB } from './db.js'

dotenv.config()
const app = express()
app.use(cors())

const port = process.env.PORT

app.use("/app/laureats", laureatesRoute)

app.use("/app/stats", statsRoute)

app.use("/app/map", mapRoute)


app.get("/", (req, res) => {

    console.log("test")
    res.send("test")
})

connectDB().then(() => {
    app.listen(port, () => {
        console.log("serwer działa na porcie " + port)
    })
})
