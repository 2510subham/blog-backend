import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import logMiddleware from "./middlewares/logMiddlewares.js"
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Welcome to my Blog app");
});
app.use("/api/auth", logMiddleware, authRoutes);
app.use("/api/blog", logMiddleware, blogRoutes);

app.listen(port, async () => {
    await connectDB();
    console.log(`Server is running at port ${port}`);
});