import { tran2Model } from "../models/tran2.js";
import { tran1Model } from "../models/tran1.js";
import mongoose from "mongoose";

const checkId = (req, res, next) => {
  try {
    let id = req.headers.placeId
    if(!id) {
      res.status(404).json('You are not allowed')
    }
    const Oke = tran2Model.find({
      placeId: new mongoose.Types.ObjectId(id)
    })

    const oke = tran1Model.find({
      placeId: new mongoose.Types.ObjectId(id)
    })

    if(!Oke && !oke ) {
      res.status(404).json('You are not allowed')
    } else next()
  } catch (error) {
    next( error )
  }
}

export default checkId