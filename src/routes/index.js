dotenv.config({path: "./.env"})
import Currencies from "../../models/Currencies.js"
import dotenv from "dotenv"
import express from "express"

const router = express.Router()

router.get("/currencies", async (req, res) => {
  try {
    const data = await Currencies.findOne({main: process.env.DB_ID})
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "Server Error"})
  }
})

export default router
