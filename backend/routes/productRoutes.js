import express from "express";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find({});
  if (products) {
    res.send(products);
  } else {
    res.status(404).send({ message: "No products found" });
  }
});


export default productRouter;
