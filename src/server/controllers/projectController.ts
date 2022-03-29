import { Router } from "express";
import Project from "../models/ProjectModel";
import verifyToken from "../utils/verifyToken";

export default Router()
    .use(verifyToken)
    .get("/", async (req, res) => {
        try {
            const data = await Project.getAllProjects();
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(404).send(error);
        }
    })
    .post("/", async (req, res) => {
        try {
            const data = await Project.createProject(req.body.name);
            res.status(200).json(data)
        } catch (error) {
            console.error(error);
            res.status(404).send(error);
        }
    })
    .delete("/", async (req, res) => {
        try {
            const data = await Project.deleteProject(req.body.name);
            res.status(200).json(data)
        } catch (error) {
            console.error(error);
            res.status(404).send(error);
        }
    });