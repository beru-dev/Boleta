import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies?.access_token;
    if(!token) return res.status(403).json({ message: "User not logged in." });

    jwt.verify(
        token,
        process.env.TOKEN_SECRET || "",
        async (err, authData) => {
            if(err) return res.status(403).json({ message: "User not authorized." });
            if(typeof authData === "string" || !authData) {
                console.log(`authData: ${authData}`)
                return res.status(403).json({ message: "User info not provided." });
            }
            req.userId = authData.id;
            req.userRole = authData.role;
            return next();
        }
    );
}