const mongoose = require("mongoose");
const dotenv = require("dotenv");
const TourismPlace = require("../models/TourismPlace");

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing in .env");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected for seeding"))
  .catch((err) => {
    console.error("DB Connection Error:", err);
    process.exit(1);
  });

const places = [
  {
    name: "Dal Lake",
    category: "Lake",
    location: "Srinagar",
    image: "/tourism/dal-lake.jpg",
    description: "Famous lake of Kashmir"
  },
  {
    name: "Gulmarg",
    category: "Hill Station",
    location: "Baramulla",
    image: "/tourism/gulmerg.jpg",
    description: "Skiing paradise"
  }
  // keep rest same...
];

const seedTourism = async () => {
  try {
    await TourismPlace.deleteMany();
    await TourismPlace.insertMany(places);

    console.log("✅ Tourism Seed Completed");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedTourism();