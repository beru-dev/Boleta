import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers.authorization;

    if(!bearerHeader) return res.status(403).json({ status: 403, message: "User not logged in." });

    jwt.verify(
        bearerHeader.split(" ")[1] || "",
        process.env.TOKEN_SECRET || "",
        async (err, authData) => {
            if(err) return res.status(403).json({ status: 403, message: "User not authorized." });

            return next();
        }
    );
}