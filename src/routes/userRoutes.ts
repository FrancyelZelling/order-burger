import express from "express";
import { User } from "../entity/User";
import bcryptjs from "bcryptjs";

const userRouter = express.Router();
const salt = bcryptjs.genSaltSync(10);

userRouter.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await User.findOne({ id });

  if (user === undefined)
    return res.status(404).json({ msg: "User Not Found " });

  // Never send password
  user.password = "";
  return res.status(200).json(user);
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const result = await User.find({ where: { email } });

  if (!email || !password || !name)
    return res.status(403).json({ msg: "Missing Fields" });

  const hashed = User.encryptPassword(password, salt);

  if (result.length <= 0) {
    const user = new User();

    user.name = name;
    user.email = email;
    user.password = hashed;

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

  if (user === undefined) {
    return res.status(404).json({ msg: "User Not Found" });
  }

  const compareResult = User.comparePassword(password, user.password);

  if (compareResult === false) {
    return res.status(403).json({ msg: "Wrong Password" });
  }

  return res.json({ msg: "User Authenticated", user: user.name });
});

export default userRouter;
