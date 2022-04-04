import { Router } from "express";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import checkRole from "../utils/checkRole";
import verifyToken from "../utils/verifyToken";

export default Router()
    .post("/login", async (req, res) => {
        try {
            if(!req.body) res.status(401).send("User info not provided.");

            const user = await UserModel.getUserByName(req.body.user_name) as any;
            if(!user) return res.status(403).send("User not found.");

            if(await bcrypt.compare(req.body.password, user.password)) {

                return jwt.sign(
                    { id: user.id, role: user.user_role },
                    process.env.TOKEN_SECRET || "",
                    { expiresIn: "1d" },
                    (err, token) => {
                        const expires = new Date();
                        expires.setDate(expires.getDate() + 1);
                        res
                            .status(200)
                            .cookie("access_token", token, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === "production",
                                expires,
                                sameSite: true
                            })
                            .json({
                                message: "User logged in.",
                                user_name: user.user_name
                            })
                    }
                );
            }
        } catch (error) {
            res.status(500).send("Could not authenticate user.")
        }
    })
    .post("/logout", (_, res) => {
        return res
            .clearCookie("access_token")
            .status(200)
            .json({ message: "Logged out" });
    })
    .post("/register", verifyToken, checkRole("ADMIN"), async (req, res) => {
        if(!req.body) return res.status(401).send("User data not provided.");

        try {
            UserModel.createUser({
                ...req.body,
                password: await bcrypt.hash(req.body.password, 10),

            });
            res.status(200).send("User registered");
        } catch (error: any) {
            res.status(401).send(error.message);
        }
    })