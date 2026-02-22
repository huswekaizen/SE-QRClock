import dotenv from "dotenv";
dotenv.config();
// app.js / server.js
import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import employeeRoute from "./routes/employeeRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoute);
app.use("/api", employeeRoute);


app.get("/", (req, res) => {
  res.send("QRClock API is running");
});

export default app;