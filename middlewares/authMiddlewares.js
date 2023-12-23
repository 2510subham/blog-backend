import jwt from "jsonwebtoken";
import auth from "../modals/auth.js";

export const validateUser = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        console.log("Decode", decode);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Error in verifying token",
        });
    }
};
