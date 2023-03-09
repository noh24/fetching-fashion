import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utility/token.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  asyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((e) => ({ ...e, product: e._id })),
      shippingAddress: req.body.shippingAddress,
      price: req.body.price,
      user: req.user._id,
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: req.body.details.id,
        status: req.body.details.status,
        update_time: req.body.details.update_time,
        email_address: req.body.details.email_address,
      },
    });
    const order = await newOrder.save();
    res.status(201).send({ message: "Order complete", order });
  })
);

orderRouter.get(
  "/history",
  isAuth,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).send(orders.reverse());
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.status(200).send(order);
    } else {
      res.status(404).send({ message: "Order could not be found" });
    }
  })
);

export default orderRouter;
