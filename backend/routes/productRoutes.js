import express from "express";
import data from "./../data.js";

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  const products = data.products;
  if (products) {
    res.send(products);
  } else {
    res.status(404).send({ message: "No products found" });
  }
});

export default productRouter;
