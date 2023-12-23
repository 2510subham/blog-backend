import auth from "../modals/auth.js";
import { comparePassword, hashPassword } from "../helper/authHelpers.js";
import JWT from "jsonwebtoken";

export async function register(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" })
        }
        const isUserExist = await auth.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new auth({ email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ success: true, message: "User created successfully" });

    }
    catch (err) {
        console.log("Error in register", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" })
        }
        const isUserExist = await auth.findOne({ email });
        if (!isUserExist) {
            return res.status(400).json({ message: "User does not exists" });
        }
        const isPasswordMatched = await comparePassword(password, isUserExist.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Password Not matched" });
        }
        const token = JWT.sign({ _id: isUserExist._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        console.log("Token", token);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: isUserExist._id,
                email: isUserExist.email,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            sucess: false,
            message: "Internal server error"
        })
    }
}
