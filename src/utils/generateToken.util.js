import jwt from "jsonwebtoken";
import envObj from "../configs/env.config.js";

export function generateJWTToken(payloadData) {
    const token = jwt.sign(payloadData, envObj.jwtToken, {
        expiresIn: "1d"
    });

    return token;
}
