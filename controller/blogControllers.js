import auth from "../modals/auth.js";
import blog from "../modals/blog.js";

export const readBlog = async (req, res) => {
    try {
        const blogs = await blog.find({});
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        const user = req.user;
        const userExist = await auth.findById(user);
        if (!userExist) return res.status(404).json({ message: "User does not exist" });

        const newBlog = new blog({ title, description });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { id } = req.params;
        const user = req.user;
        const userExist = await auth.findById(user);
        if (!userExist) return res.status(404).json({ message: "User does not exist" });
        const updatedBlog = await blog.findByIdAndUpdate(id, { title, description }, { new: true });
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const userExist = await auth.findById(user);
        if (!userExist) return res.status(404).json({ message: "User does not exist" });
        await blog.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}