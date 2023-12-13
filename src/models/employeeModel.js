import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email:{type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
  placeId: {type: String, required: true}
})

export const employeeModel = mongoose.model('Employee', employeeSchema);