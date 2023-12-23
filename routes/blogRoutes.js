import express from 'express';
import { validateUser } from "../middlewares/authMiddlewares.js";
import { createBlog, readBlog, deleteBlog, updateBlog } from "../controller/blogControllers.js";

const router = express.Router();

router.get("/", readBlog);
router.post("/create", validateUser, createBlog);
router.put("/update/:id", validateUser, updateBlog);
router.delete("/delete/:id", validateUser, deleteBlog);

export default router;
