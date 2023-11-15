import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: { type: String, required: false},
  address: { type: String, required: true},
  // belongTo: { type: String, required: true },
  type: { type: String, required: true },
  managerEmail: { type: String, required: true }, 
})

export const placeModel = mongoose.model('place', placeSchema);