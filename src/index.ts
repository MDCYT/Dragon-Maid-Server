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

  //Make a new model
  const User = mongoose.model(
    "Users",
    new mongoose.Schema({
      username: String,
      id: String
    })
  );


  //Save the new collection in the database
  const user = await User.create({
    username: username,
    id: id
  });

  user.save().then(() => {
    res.send(user);
  }
  ).catch(err => {
    res.send(err);
  })

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
