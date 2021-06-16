import { Router } from "express"
import { Category } from "../entity/Category"

const categoryRouter = Router();

categoryRouter.get("/", async (req, res) => {
  const categories = await Category.find();

  if (categories === undefined) {
    return res.status(500).json({ msg: "Error Finding Categories" })
  }

  return res.status(200).json(categories)
})

categoryRouter.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(403).json({ msg: "Missing Fields" })
  }

  const findCategory = await Category.findOne({ name })

  if (findCategory !== undefined) { 
    return res.status(403).json({ msg: "Category Already Exists" })
  }

  try {
    const category = new Category();
    category.name = name;

    await category.save();

    return res.status(200).json({ msg: "Category Created"})
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" })
  }
})

categoryRouter.put("/", async (req, res) => {
  const { id, name } = req.body;

  if (!name || !id) {
    return res.status(403).json({ msg: "Missing Fields" })
  }
  
  const category = await Category.findOne({ id });
  
  if (category === undefined) {
    return res.status(404).json({ msg: "Category Not Found" })
  }

  try {
    category.name = name;

    await category.save();

    return res.status(200).json({ msg: "Category Updated"})
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" })
  }
})

categoryRouter.delete("/:id",async (req, res) => {
  const id = parseInt(req.params.id) 

  if (!id) {
    return res.status(403).json({ msg: "Missing ID" })
  }

  const category = await Category.findOne({id})

  if (!category) {
    return res.status(404).json({ msg: "Category Not Found" })
  }

  try{
    await category.remove();

    return res.status(200).json({ msg: "Category Removed" })
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" })
  }
})

export default categoryRouter;
