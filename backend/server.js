import express from "express";
import dotenv from 'dotenv';
import productRouter from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 1111;

app.get("/", (req, res) => {
  res.send("You are now listening in on 1111");
});

app.use('/api/products', productRouter);

app.listen(port, () => {
  console.log(`serving at http://localhost:${port}`);
});
