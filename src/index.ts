import express from "express";
// tslint:disable-next-line: no-var-requires
if (process.env.NODE_ENV !== "production") require("dotenv").config();
import routes from "./routes/router";
import morgan from "morgan"
import { join } from "path";
throw error
const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));
app.use(express.urlencoded({ extended: true }));
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Public files
app.use(express.static(join(__dirname, "public")));

app.set("json spaces", 2)
app.use(morgan('dev'))

app.use((_req, res, next) => {
  res.setHeader("X-Powered-By", "MDCDEV youtube.com/c/MDCPE")
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-UA-Compatible", "IE=edge");
  res.setHeader("server", "MDCDEV");
  next();
})

routes.forEach(route => {
  app.use("/", route.route);
})

// Error 404 handler
app.use((req, res, next) => {
  res.redirect("/404");
})

app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`Server running on port ${port}`);
})
