import mongoose from "mongoose";
const Schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  arabicNumeral: String,
  romanNumeral: String,
});
export const Numeral = mongoose.model("Numeral", Schema);
