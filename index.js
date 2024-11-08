import dotenv from "dotenv"
import express from "express"
import connectDB from "./database/config.js"
import indexRouter from "./src/routes/index.js"
import cronJob from "./pages/api/cronJobs.js"
import cors from "cors"
dotenv.config({path: "./.env"})

connectDB()

const app = express()

app.use(cors())

app.use(express.json())

cronJob()

app.use("/api", indexRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})
