
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {type: String, required: true},
  status: {type: String, required: false}, 
  dateSend: {type: Date, required: false},
  dateReceive: {type: Date, required: false},
  senderEmail: {type: String, required: true },
  receiverEmail: {type: String, required: true },
  tranPlaceId: {type: mongoose.Types.ObjectId, required: true},
})

export const orderGatherModel = mongoose.model('Gather order', orderSchema);