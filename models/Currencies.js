import mongoose from "mongoose"

const CurrenciesSchema = new mongoose.Schema({
  result: {
    type: String,
    required: true,
  },
  time_last_update_unix: {
    type: Number,
    required: true,
  },
  time_last_update_utc: {
    type: String,
    required: true,
  },
  time_next_update_unix: {
    type: Number,
    required: true,
  },
  time_next_update_utc: {
    type: String,
    required: true,
  },
  base_code: {
    type: String,
    required: true,
  },
  conversion_rates: {
    type: Object,
    required: true,
  },
})

export default mongoose.model("Currencies", CurrenciesSchema)
