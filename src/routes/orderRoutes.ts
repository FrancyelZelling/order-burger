import { Router } from "express";
import { In } from "typeorm";
import { Order } from "../entity/Order";
import { User } from "../entity/User";
import { Product } from "../entity/Product";

const orderRouter = Router();

// Get all Orders
orderRouter.get("/", async (req, res) => {
  const orders = await Order.find();

  return res.status(200).json(orders);
});

// Get single order
orderRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  const orders = await Order.findOne(id);
  if (orders === undefined)
    return res.status(404).json({ msg: "Cannot Find Orders" });

  return res.status(200).json(orders);
});

// Create new order
orderRouter.post("/", async (req, res) => {
  const userId = parseInt(req.body.userId);
  const products: [number] = req.body.products;

  if (!userId || products.length <= 0 || products === undefined)
    return res.status(403).json({ msg: "Missing Fields" });

  const user = await User.findOne(userId);
  const productsArr = await Product.find({ where: { id: In(products) } });

  if (user === undefined) {
    return res.status(404).json({ msg: "Cannot Find User" });
  }

  if (products.length !== productsArr.length) {
    return res.status(404).json({ msg: "Cannot Find One Or More Products" });
  }

  if (productsArr.length <= 0) {
    return res
      .status(403)
      .json({ msg: "Cannot Create Order With No Products" });
  }

  try {
    const order = new Order();
    order.products = productsArr;
    order.customer = user;

    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed To Create Order" });
  }
});

orderRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const order = await Order.findOne(id);

  if (order === undefined) {
    return res.status(404).json({ msg: "Order Not Found" });
  }

  try {
    await order.remove();
    return res.status(200).json({ msg: "Order Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Unable To Delete Order" });
  }
});

export default orderRouter;
