import { Router } from "express";
import { Product } from "../entity/Product";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find();

  return res.status(200).json({ products });
});

productRouter.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price)
    return res.status(403).json({ msg: "Missing Fields" });

  const product = Product.create({
    name,
    description,
    price,
  });

  try {
    await Product.save(product);
    return res
      .status(200)
      .json({ msg: "Product Created", product: product.name });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed To Create Product" });
  }
});

export default productRouter;
