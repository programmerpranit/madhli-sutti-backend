import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
    name: { type: String, required: true, default: "" },
    price: {type: Number, required: true},
    score: {type: Number, required: true}
  },
  { timestamps: true }
);

mongoose.models = {};

export default mongoose.model("Dish", DishSchema);
