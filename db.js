// Połączenie z bazą danych

import dotenv from 'dotenv';
import { MongoClient } from "mongodb"

dotenv.config()

let db

async function connectDB() {
    const client = new MongoClient(process.env.Mongo_URI)
    await client.connect()
    db = client.db('sample_mflix')
    console.log("Połączono")
    return db
}

function getDB() {
    if (!db) {
        throw new Error('❌ DB not initialized')
    }
    return db
}

export { connectDB, getDB };