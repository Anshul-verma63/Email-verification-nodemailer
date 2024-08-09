import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import dbConnect from "./db/dbConnection.js";
import router from "./routes/userRoutes.js";
import { errorMiddlware } from "./middleware/error.js";

//create instance
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "i am server!",
  });
});
app.use("/api/v1/user", router);

//create server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

//connect database
dbConnect();

//handle custom error
app.use(errorMiddlware);
