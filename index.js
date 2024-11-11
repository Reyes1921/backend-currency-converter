dotenv.config({path: "./.env"})
import connectDB from "./database/config.js"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import indexRouter from "./src/routes/index.js"
import cronJob from "./src/routes/cron.js"

connectDB()

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api", indexRouter)

app.use("/api", cronJob)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})
