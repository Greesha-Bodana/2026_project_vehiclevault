import express from "express";
import Car from "../models/Car.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find({}, "carId name type engine mileage transmission overview").sort({ name: 1 });
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch cars." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findOne({ carId: req.params.id });
    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }
    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch car details." });
  }
});

export default router;
