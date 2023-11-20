import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {type: String, required: true},
  status: {type: String, required: false}, 
  dateSend: {type: Date, required: false},
  dateReceive: {type: Date, required: false},
  senderEmail: {type: String, required: true },
  receiverEmail: {type: String, required: true },
})

export const orderModel = mongoose.model('Order', orderSchema);