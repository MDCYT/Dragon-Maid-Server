import express from "express";
import routes from "./routes/router";
import mongoose from "mongoose";

const mongo_url = process.env.MONGODB_URL
if (!mongo_url) throw new Error("MONGODB_URL is not defined");

mongoose.connect(mongo_url).then(() => {
  console.log("Connected to MongoDB");
}
).catch(err => {
  console.log("Error connecting to MongoDB: ", err.message);
}
);

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

routes.forEach(route => {
  app.use("/", route.router);
})

app.post("/api/v1/user", async (req, res) => {
  const { username, id } = req.body

  //Make a new collection in the database
  const User = mongoose.model("User", {
    name: String,
    id: String
  });

  //Create a new user
  const user = new User({
    name: username,
    id: id
  });

  //Save the user
  await user.save();

  //Return the user
  res.json(user);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
