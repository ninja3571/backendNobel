import { getDB } from '../db.js'
import express from 'express'

const router = express.Router()

router.get("/count", async (req, res) => {
    const db = getDB()

    const count = await db.collection("laureats").aggregate([
        {
            $group: {
                _id: "$bornCountryCode", count: { $sum: 1 }, laureats: {
                    $push: { firstname: "$firstname", surname: "$surname" }
                }
            }
        }
    ]).toArray()

    res.json(count)
})

export default router