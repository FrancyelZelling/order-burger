import { Router } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entity/Product";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const products = await getRepository(Product).find();

  return res.status(200).json({ products });
});

productRouter.post("/", async (req, res) => {
  const { name, description, price } = req.body;
  const productRepository = getRepository(Product);

  const convertedPrice = parseFloat(price);
  console.log(convertedPrice);

  if (!name || !description || !price)
    return res.status(403).json({ msg: "Missing Fields" });

  const product = productRepository.create({
    name,
    description,
    price,
  });

  try {
    await productRepository.save(product);
    return res
      .status(200)
      .json({ msg: "Product Created", product: product.name });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ m̀sg: "Failed To Create Product" });
  }
});

export default productRouter;
