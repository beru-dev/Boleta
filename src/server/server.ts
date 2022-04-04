import setEnv from "./utils/setEnv";
setEnv();

import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import api from "./controllers/api";
import syncDB from "./models/config/syncDB";

syncDB();

const PORT = process.env.PORT || 62000;

declare module "express" {
    export interface Request {
        userId?: string
        userRole?: string
    }
}

express()
    .use(express.json())
    .use(express.urlencoded())
    .use(cors())
    .use(cookieParser())
    .use("/api", api)
    .use(express.static(path.resolve(__dirname, "public")))
    .get("*", (_, res) => {
        res.sendFile(path.resolve(__dirname, "public/index.html"))
    })
    .listen(PORT, () => console.log(`listening on port ${PORT}`));