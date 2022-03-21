import setEnv from "./utils/setEnv";
setEnv();

import express from "express";
import cors from "cors";
import path from "path";
import api from "./controllers/api";
import syncDB from "./models/config/syncDB";

syncDB();

const PORT = process.env.PORT || 62000;

express()
    .use(express.json())
    .use(express.urlencoded())
    .use(cors())
    .use("/api", api)
    .use(express.static(path.resolve(__dirname, "public")))
    .get("*", (_, res) => {
        res.sendFile(path.resolve(__dirname, "public/index.html"))
    })
    .listen(PORT, () => console.log(`listening on port ${PORT}`));