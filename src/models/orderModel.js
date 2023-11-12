import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: {
    id: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    status: {type: String, required: false}, 
    dateSend: {type: Date, required: true},
    dateReceive: {type: Date, required: false},
  }, 
  sender: {
    ref: 'User',
    required: true
  },
  receiver: {
    ref: 'User',
    required: true
  }
})

export const orderModel = mongoose.model('Order', orderSchema);