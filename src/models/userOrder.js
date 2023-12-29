
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {type: String, required: false},
  status: {type: String, required: false}, 
  dateSend: {type: Date, required: false},
  dateReceive: {type: Date, required: false},
  senderEmail: {type: String, required: false},
  receiverEmail: {type: String, required: false },
  placeId: {type: mongoose.Types.ObjectId, required: false},
})

export const orderUserModel = mongoose.model('User order', orderSchema);