import { Express, Request, Response } from "express";

const app:Express = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
