import { Request, Response, NextFunction } from 'express';

type Role = "ADMIN" | "BASIC" | "GUEST";

const roleLevels: Role[] = ["GUEST", "BASIC", "ADMIN"],

    getRoleLevel = (role: Role): number => roleLevels.indexOf(role);

export default (role: Role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(getRoleLevel(req.userRole as Role) < getRoleLevel(role)) {
            res.status(401)
            res.send({ message: "Insufficient permission." });
            return
        }

        next();
    }
}