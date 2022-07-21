import mongoose from "mongoose";
import { join } from "path";
import fs from "fs";

if (!process.env.MONGODB_URL) throw new Error("MONGODB_URL is not defined");

mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB");
        console.error(err);
    });


const models = fs.readdirSync(join(__dirname, "databases"));
    models.forEach((model) => {
      const modelName = model.split(".")[0];
      const modelPath = join(__dirname, "databases", model);
      const modelFile = require(modelPath);
      module.exports[modelName] = modelFile;
});