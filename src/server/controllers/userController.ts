import { Router } from "express";
import UserModel from "../models/UserModel";
// import isValidEmail from "../utils/isValidEmail";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// const createFirstUser = async () => {
//     const { FIRST_USER_NAME, FIRST_USER_EMAIL, FIRST_USER_PASS } = process.env;
//     if(!FIRST_USER_NAME) {
//         console.error("YOU FORGOT TO PUT THE FIRST USER NAME INTO THE ENV DUMMY!");
//         return
//     }
//     if(!FIRST_USER_EMAIL) {
//         console.error("YOU FORGOT TO PUT THE FIRST USER EMAIL INTO THE ENV DUMMY!");
//         return
//     }
//     if(!FIRST_USER_PASS) {
//         console.error("YOU FORGOT TO PUT THE FIRST USER PASS INTO THE ENV DUMMY!");
//         return
//     }
//     UserModel.createUser({
//         user_name: FIRST_USER_NAME,
//         user_email: FIRST_USER_EMAIL,
//         password: await bcrypt.hash(FIRST_USER_PASS, 10)
//     });
// }

// createFirstUser();

export default Router()
    .post("/login", async (req, res) => {
        if(!req.body) res.status(401).send("User info not provided.");

        const user = await UserModel.getUserByName(req.body.user_name) as any;
        if(!user) res.status(403).send("User not found.");

        try {
            if(await bcrypt.compare(req.body.password, user.password)) {

                return jwt.sign(
                    { user },
                    process.env.TOKEN_SECRET || "",
                    { expiresIn: "1d" },
                    (err, token) => {
                        res.status(200).json({
                            message: "User logged in.",
                            token,
                            user_name: user.user_name
                        })
                    }
                );
            }
        } catch (error) {
            res.status(500).send("Could not authenticate user.")
        }
    })
    // .post("/register", async (req, res) => {
    //     if(!req.body) return res.status(401).send("User data not provided.");

    //     const { user_name, user_email, password } = req.body;
    //     if(typeof user_name !== "string" || user_name.length === 0) res.status(401).send("Invalid user name");
    //     if(!isValidEmail(user_email)) return res.status(401).send("Invalid email");

    //     try {
    //         UserModel.createUser({
    //             user_name,
    //             user_email,
    //             password: await bcrypt.hash(password, 10)
    //         });
    //         res.status(200).send("User registered");
    //     } catch (error) {
    //         res.status(500).send("Could not register user");
    //     }
    // })