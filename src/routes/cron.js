dotenv.config({path: "./.env"})
import Currencies from "../../models/Currencies.js"
import dotenv from "dotenv"
import express from "express"
import axios from "axios"

const router = express.Router()

router.get("/cron", async (req, res) => {
  try {
    const now = Date.now() / 1000
    const exchangeRate = await Currencies.findOne({
      main: process.env.DB_ID,
    })

    if (exchangeRate && exchangeRate.time_next_update_unix < now) {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`
        )
        const newData = response.data
        await Currencies.findOneAndUpdate(
          {main: process.env.DB_ID}, // Filter: Find the document by its ID
          {
            $set: {
              conversion_rates: newData.conversion_rates,
              time_last_update_unix: newData.time_last_update_unix,
              time_next_update_unix: newData.time_next_update_unix,
              time_last_update_utc: newData.time_last_update_utc,
              time_next_update_utc: newData.time_next_update_utc,
            },
          },
          {new: true} // Return the updated document
        )

        console.log("Exchange rates updated successfully")
      } catch (error) {
        console.error("Error fetching exchange rates:", error)
      }
    } else {
      console.log("NOT TIME")
    }
  } catch (error) {
    console.error(err)
    res.status(500).json({error: "Server Error"})
  }
})

export default router
