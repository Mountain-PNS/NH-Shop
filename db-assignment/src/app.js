import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { conectDB } from './config/db';
import dotenv from 'dotenv';
import routerAuth from './routers/auth';
import routerProduct from './routers/products';
import routerCategory from './routers/categories';
import routerCart from './routers/cart';
import routerOrder from './routers/order';
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors())
app.use(morgan("tiny"))

conectDB(process.env.MONGO_URI);

app.get("/", (req, res) => {
    res.send("Conencted to the DB")
})
app.use("/api",routerAuth)
app.use("/api",routerProduct)
app.use("/api",routerCategory)
app.use("/api",routerCart)
app.use("/api",routerOrder)
export const viteNodeApp = app;