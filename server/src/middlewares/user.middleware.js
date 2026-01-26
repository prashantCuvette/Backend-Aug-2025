import jwt from "jsonwebtoken";
import envObj from "../configs/env.config.js";


export const authenticateUser = (req, res, next) => {
    try {

        const cookies = req.cookies?.accessToken;
        if (!cookies) {
            return res.status(401).json({
                success: false,
                message: "token not found",
            });
        }

        const verifyToken = jwt.verify(cookies, envObj.jwtToken);
        if (!verifyToken) {
            return res.status(400).json({
                success: false,
                message: "token expired or tampered",
            });
        }

        req.user = verifyToken;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            reason: "internal server error",
            message: error.message,
        });
    }
}

