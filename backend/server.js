import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/productRoutes.js";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoutes.js";

dotenv.config();
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connected to db");
} catch (err) {
  console.log(err.message);
}

const app = express();
const port = process.env.PORT || 1111;

app.get("/", (req, res) => {
  res.send("You are now listening in on 1111");
});

app.use('/api/seed', seedRouter)
app.use("/api/products", productRouter);

app.listen(port, () => {
  console.log(`serving at http://localhost:${port}`);
});
