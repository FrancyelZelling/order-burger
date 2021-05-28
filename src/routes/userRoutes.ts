import express from "express";
import { User } from "../entity/User";

const userRouter = express.Router();

userRouter.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await User.findOne({ id });

  if (user === undefined)
    return res.status(404).json({ msg: "User Not Found " });

  // Never send password
  user.password = null;
  return res.status(200).json(user);
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const result = await User.find({ where: { email } });

  if (!email || !password || !name)
    return res.status(403).json({ msg: "Missing Fields" });

  if (result.length <= 0) {
    const user = new User();

    user.name = name;
    user.email = email;
    user.password = password;

    try {
      await User.save(user);
    } catch (error) {
      console.log(error);
    }

    return res.status(200).json({ msg: "User Created" });
  } else {
    return res.status(403).json({ msg: "Email already in use" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({ msg: "Missing Fields" });
  }

  const user = await User.findOne({ email });

  if (user !== undefined) {
    if (user.password === password) {
      return res.status(200).json({ msg: "User Authenticated" });
    } else {
      return res.status(403).json({ msg: "Invalid Password" });
    }
  }
  return res.json({ msg: "User Not Found" });
});

export default userRouter;
