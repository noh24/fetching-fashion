import express from "express";
import data from "./../data.js";
import Product from "./../models/productModel.js";
import User from "./../models/userModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  try {
    await Product.deleteMany({});
    const fleeceSherpas = await Product.insertMany(data.products.fleeceSherpas);
    const jacketVests = await Product.insertMany(data.products.jacketVests);

    await User.deleteMany({});
    const users = await User.insertMany(data.users);
    res.send({ users, fleeceSherpas, jacketVests });
  } catch (err) {
    res.send(err.message);
  }
});

export default seedRouter;
