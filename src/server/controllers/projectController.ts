import { Router } from "express";
import Project from "../models/ProjectModel";
import verifyToken from "../utils/verifyToken";

export default Router()
    .post("/", /*verifyToken,*/ async (req, res) => {
        try {
            const data = await Project.createProject(req.body.name);
            res.status(200).json(data)
        } catch (error) {
            console.error(error);
            res.status(404).send(error);
        }
    })
    .delete("/", verifyToken, async (req, res) => {
        try {
            const data = await Project.deleteProject(req.body.name);
            res.status(200).json(data)
        } catch (error) {
            console.error(error);
            res.status(404).send(error);
        }
    });