import Mongoose from "mongoose";

const { Schema } = Mongoose;

const denominationSchema = new Schema({
  title: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Denomination = Mongoose.model("Denomination", denominationSchema);
