import "reflect-metadata";
import { createConnection } from "typeorm";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoute";
import orderRouter from "./routes/orderRoutes";
import categoryRouter from "./routes/categoryRoutes"
import App from "./server";

createConnection()
  .then(async (connection) => {
    App.use("/users", userRouter);
    App.use("/product", productRouter);
    App.use("/order", orderRouter);
    App.use("/category", categoryRouter)
    await connection.query("PRAGMA foreign_keys=OFF;");
    await connection.runMigrations();
    await connection.query("PRAGMA foreign_keys=ON;");
    App.listen(3000, () => {
      console.log(`Server Running on http://localhost:3000`);
    });
  })
  .catch((error) => console.log(error));
