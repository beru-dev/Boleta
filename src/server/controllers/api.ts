import { Router } from "express";
import projectController from "./projectController";
import ticketController from "./ticketController";
import userController from "./userController";

export default Router()
    .use("/project", projectController)
    .use("/ticket", ticketController)
    .use("/user", userController)
