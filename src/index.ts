import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import App from "./server";

createConnection()
  .then(async (connection) => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";

    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

    App.get("/", (req, res) => {
      res.status(200).json({ msg: "Hello From TypeOrm" });
    });

    App.listen(3000, () => {
      console.log(`Server Running on http://localhost:3000`);
    });
  })
  .catch((error) => console.log(error));
