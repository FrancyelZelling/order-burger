import express from "express";
import { User } from "../entity/User";
import { getRepository } from "typeorm";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const users = await getRepository(User).find();

  return res.json({ users });
});

userRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  const result = await getRepository(User).find({ where: { email } });

  if (result.length <= 0) {
    const user = new User();

    user.name = name;
    user.email = email;
    user.password = password;

    try {
      const savedUser = await getRepository(User).save(user);
    } catch (error) {
      console.log(error);
    }

    return res.status(200).json({ msg: "User Created" });
  } else {
    return res.status(403).json({ msg: "Email already in use" });
  }
});

export default userRouter;
