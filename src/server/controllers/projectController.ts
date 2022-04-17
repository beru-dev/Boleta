import { Router } from "express";
import { createProject, deleteProject, getAllProjects } from "../models/ProjectModel";
import verifyToken from "../utils/verifyToken";
import checkRole from "../utils/checkRole";

export default Router()
    .use(verifyToken)
    .get("/", async (_, res) => {
        try {
            const data = await getAllProjects();
            res.status(200).json(data);
        } catch ({ message }) {
            res.status(404).json({ message });
        }
    })
    .post("/", checkRole("ADMIN"), async (req, res) => {
        try {
            const data = await createProject(req.body.name);
            res.status(201).json(data);
        } catch ({ message }) {
            res.status(404).json({ message });
        }
    })
    .delete("/", checkRole("ADMIN"), async (req, res) => {
        try {
            const data = await deleteProject(req.body.name);
            res.status(204).json(data);
        } catch ({ message }) {
            res.status(404).json({ message });
        }
    });