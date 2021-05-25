import "reflect-metadata";
import { createConnection } from "typeorm";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoute";
import App from "./server";

createConnection()
  .then(async (connection) => {
    App.use("/users", userRouter);
    App.use("/product", productRouter);
    App.listen(3000, () => {
      console.log(`Server Running on http://localhost:3000`);
    });
  })
  .catch((error) => console.log(error));
