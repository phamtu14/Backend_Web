import { orderTranModel } from "../models/orderTranModel.js";
import mongoose from "mongoose";

const checkId = (req, res, next) => {
  try {
    let id = req.headers.id
    if(!id) {
      res.status(404).json('You are not allowed')
    }
    const Oke = orderTranModel.find({
      _id: new mongoose.Types.ObjectId(id)
    })

    if(!Oke) {
      res.status(404).json('You are not allowed')
    } else next()
  } catch (error) {
    next( error )
  }
}

export default checkId