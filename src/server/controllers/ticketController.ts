import { Router } from "express";
import { getTickets, createTicket, updateTicket } from "../models/TicketModel";
import verifyToken from "../utils/verifyToken";
import checkRole from "../utils/checkRole";

export default Router()
    .use(verifyToken)
    .get("/", async (req, res) => {
        try {
            res.json(await getTickets(req.query)).status(200)
        } catch (error) {
            res.status(404);
        }
    })
    .post("/", checkRole("BASIC"), async (req, res) => {
        try {
            res.json(await createTicket(req.body)).status(201); 
        } catch (error) {
            res.status(404);
        }
    })
    .put("/id/:id", checkRole("BASIC"),async (req, res) => {
        try {
            res.json(await updateTicket(req.params.id, req.body)).status(204);
        } catch (error) {
            res.status(404);
        }
    });