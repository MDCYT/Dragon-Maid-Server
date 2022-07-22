import express from "express";
if (process.env.NODE_ENV !== "production") require("dotenv").config();
import routes from "./routes/router";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));
app.set("json spaces", 2)

routes.forEach(route => {
  app.use("/", route.route);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
