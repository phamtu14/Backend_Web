
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {type: String, required: true},
  status: {type: String, required: false}, 
  dateSend: {type: Date, required: false},
  dateReceive: {type: Date, required: false},
  senderEmail: {type: String, required: true },
  receiverEmail: {type: String, required: true },
  placeId: {type: mongoose.Types.ObjectId, required: false},
})

export const tran1Model = mongoose.model('Tran 1 order', orderSchema);