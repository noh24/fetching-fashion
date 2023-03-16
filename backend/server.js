import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/productRoutes.js";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import path from "path";

dotenv.config();
try {
  await mongoose.connect(process.env.MONGODB_URI, {dbName: 'fetching-fashion'});
  console.log("connected to db");
} catch (err) {
  console.log(err.message);
}

const app = express();
const port = process.env.PORT || 1111;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("You are now listening in on 1111");
});

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err });
});

app.listen(port, () => {
  console.log(`serving at http://localhost:${port}`);
});
