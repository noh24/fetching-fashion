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

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "This product could not be found" });
  }
});

export default productRouter;
