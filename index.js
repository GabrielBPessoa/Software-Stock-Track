import express from "express";
import dotenv from "dotenv";
import { router } from "./src/resources/routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const run = async () => {
  try {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(router);
    console.log(`\nStarting SST Core server in ${NODE_ENV}`);
    app.listen(PORT, () => {
      const date = new Date();
      console.log(`${date} - Server running in port: [${PORT}]`);
    });
  } catch (e) {
    console.error(e);
  }
};

run();
