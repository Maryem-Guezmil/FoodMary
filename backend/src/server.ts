import express from "express";
import cors from "cors";
import foodRouter from './Routers/food.router'
import userRouter from './Routers/user.router'
import dotenv from 'dotenv';
import { dbConnect } from "./configs/database.config";
import orderRouter from "./Routers/order.router";
dotenv.config();
dbConnect();
//we gonna define all apis using this express app
//its a ts app
const app = express();

//express doesn’t support json by default , u need to enable it
//now u can get req with json body inside ur apis
app.use(express.json());

//cors allow req to come from other url
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const port = 5000;
app.listen(port, () => {
  console.log("website served on http://localhost:" + port);
});
