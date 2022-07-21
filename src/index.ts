import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.post("/api/v1/user", async (req, res) => {
  const data = req.body
  console.log({data})
  res.sendStatus(200)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
