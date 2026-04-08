// endpointy API

import { getDB } from '../db.js'
import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    const { category, yearFrom, yearTo, country, search, skipp } = req.query;
    const filter = {};

    let yearFilter;
    if (yearFrom || yearTo) {

        let x = yearFrom ? parseInt(yearFrom) : undefined;
        let y = yearTo ? parseInt(yearTo) : undefined;


        yearFilter = {};
        if (x !== undefined) yearFilter.$gte = x;
        if (y !== undefined) yearFilter.$lte = y;
    }

    if (category || yearFilter) {
        filter.prizes = {
            $elemMatch: {
                ...(category && { category: new RegExp(`^${category}$`, 'i') }),
                ...(yearFilter && { year: yearFilter })
            }
        };
    }

    if (country) {
        filter.bornCountryCode = new RegExp(country, 'i')
    }

    if (search) {
        filter.$or = [
            { firstname: new RegExp(search, 'i') },
            { surname: new RegExp(search, 'i') }
        ]
    }
    const db = getDB()
    try {
        const laureats = await db.collection('laureats').find(filter).skip(parseInt(skipp)).limit(25).toArray()
        res.json(laureats)

    } catch (err) {
        res.status(500).json({ error: err.message });
    }


})

router.get("/:id", async (req, res) => {

    const id = req.params.id

    const db = getDB()
    const laureat = await db.collection("laureats").find(id && { "id": `${id}` }).toArray()

    res.json(laureat)
})

export default router