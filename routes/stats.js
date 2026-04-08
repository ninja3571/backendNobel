// endpointy API

import { getDB } from '../db.js'
import express from 'express'

const router = express.Router()


router.get("/category", async (req, res) => {
    const db = getDB()
    const categories = await db.collection("laureats").distinct("prizes.category")

    res.json(categories)
})

router.get("/categories", async (req, res) => {
    const db = getDB()
    const results = await db.collection("laureats").aggregate([
        { $unwind: "$prizes" },
        {
            $group: {
                _id: "$prizes.category",
                laureatesCount: { $sum: 1 }         // liczy laureatów kategorii
            }
        },
        { $sort: { laureatesCount: -1 } }
    ]).toArray();

    res.json(results)
})

router.get("/years", async (req, res) => {
    const db = getDB()
    const results = await db.collection("laureats").aggregate([
        { $unwind: "$prizes" },                  // Flatten the prizes array
        {
            $group: {
                _id: "$prizes.year",            // Group by prize category
                laureatesCount: { $sum: 1 }         // Count how many people have that category
            }
        },
        { $sort: { _id: 1 } }
    ]).toArray();

    // console.log(results);

    res.json(results)
})

router.get("/countries", async (req, res) => {
    const db = getDB()
    const results = await db.collection("laureats").aggregate([
        {
            $group: {
                _id: "$bornCountry",
                laureatesCount: { $sum: 1 }         // liczy laureatów kategorii
            }
        },
        { $sort: { laureatesCount: -1 } }
    ]).limit(15).toArray();


    res.json(results)
})

export default router