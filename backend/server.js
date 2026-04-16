import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import carRoutes from "./routes/cars.js";
import Car from "./models/Car.js";

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/VehicleVault";

const seedCars = async () => {
  const count = await Car.countDocuments();
  if (count === 0) {
    const seedData = [
      {
        carId: "1",
        name: "Hyundai Creta",
        type: "SUV",
        engine: "1497 cc",
        mileage: "17.4 km/l",
        transmission: "Automatic",
        overview:
          "A balanced family SUV with strong comfort, features, and road presence.",
        strengths: ["Premium cabin", "Smooth city driving", "Strong feature list"],
        weaknesses: ["Rear seat under-thigh support could be better", "Top variants cost more"]
      },
      {
        carId: "2",
        name: "Honda City",
        type: "Sedan",
        engine: "1498 cc",
        mileage: "18.4 km/l",
        transmission: "Manual",
        overview:
          "A refined sedan known for comfort, reliability, and long-distance driving.",
        strengths: ["Spacious cabin", "Refined engine", "Great comfort"],
        weaknesses: ["Lower ground clearance", "Less SUV-like stance"]
      },
      {
        carId: "3",
        name: "Tata Nexon",
        type: "Compact SUV",
        engine: "1199 cc",
        mileage: "17.1 km/l",
        transmission: "Automatic",
        overview:
          "A safety-focused compact SUV with bold design and practical features.",
        strengths: ["Strong safety package", "Solid build quality", "Modern design"],
        weaknesses: ["Infotainment can feel busy", "Rear visibility is moderate"]
      }
    ];
    await Car.create(seedData);
    console.log("Seeded default car data.");
  }
};

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("MongoDB connected.");
    await seedCars().catch((error) => {
      console.warn("Seed data skipped:", error.message);
    });
    app.listen(PORT, () => {
      console.log(`VehicleVault backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
