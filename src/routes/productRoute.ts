import { Router } from "express";
import { Product } from "../entity/Product";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find();

  return res.status(200).json({ products });
});

productRouter.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const product = await Product.findOne({ id });

  if (product === undefined)
    return res.status(403).json({ msg: "Product Not Found" });

  return res.status(200).json({ product });
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

productRouter.put("/", async (req, res) => {
  const { id, name, description, price } = req.body;

  if (!id || !name || !description || !price)
    return res.status(403).json({ msg: "Missing Fields" });

  const productToUpdate = await Product.findOne({ id });

  if (productToUpdate === undefined)
    return res.status(403).json({ msg: "Product Not Found" });

  productToUpdate.name = name;
  productToUpdate.description = description;
  productToUpdate.price = price;

  try {
    await productToUpdate.save();
    return res
      .status(200)
      .json({ msg: "Product Updated", product: productToUpdate.name });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed To Update Product" });
  }
});

productRouter.delete("/", async (req, res) => {
  const { id } = req.body;

  const productToDelete = await Product.findOne({ id });

  if (productToDelete === undefined)
    return res.status(403).json({ msg: "Product Not Found" });

  try {
    await productToDelete.remove();
    return res.status(200).json({ msg: "Product Deleted" });
  } catch (error) {
    return res.status(500).json({ msg: "Failed To Delete Product" });
  }
});

export default productRouter;
