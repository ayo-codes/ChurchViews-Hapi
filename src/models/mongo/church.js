import Mongoose from "mongoose";

const { Schema } = Mongoose;

const churchSchema = new Schema({
  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  denominationid: {
    type: Schema.Types.ObjectId,
    ref: "Denomination",
  },
});

export const Church = Mongoose.model("Church", churchSchema);
