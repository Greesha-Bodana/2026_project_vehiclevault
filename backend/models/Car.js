import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    carId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    engine: { type: String, required: true },
    mileage: { type: String, required: true },
    transmission: { type: String, required: true },
    overview: { type: String, required: true },
    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] }
  },
  {
    timestamps: true
  }
);

const Car = mongoose.model("Car", CarSchema);
export default Car;
