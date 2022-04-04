import { Router } from "express";
import Ticket from "../models/TicketModel";
import verifyToken from "../utils/verifyToken";
import checkRole from "../utils/checkRole";

export default Router()
    .use(verifyToken)
    .get("/", async (_, res) => {
        try {
            res.json(await Ticket.getAllTickets()).status(200)
        } catch (error) {
            res.status(404);
        }
    })
    .get("/ticket/:ticketID", async (req, res) => {
        try {
            res.json(await Ticket.getTicket(req.params.ticketID)).status(200);
        } catch (error) {
            res.status(404);
        }
    })
    .get("/project/:project", async (req, res) => {
        try {
            res.json(await Ticket.getTicketsByProject(req.params.project)).status(200);
        } catch (error) {
            res.status(404);
        }
    })
    .get("/submitter/:user_name", async (req, res) => {
        try {
            res.json(await Ticket.getTicketsBySubmitter(req.params.user_name)).status(200);
        } catch (error) {
            res.status(404);
        }
    })
    .get("/assignee/:user_name", async (req, res) => {
        try {
            res.json(await Ticket.getTicketsByAssignee(req.params.user_name)).status(200);
        } catch (error) {
            res.status(404);
        }
    })
    .post("/", checkRole("BASIC"), async (req, res) => {
        try {
            res.json(await Ticket.createTicket(req.body)).status(201); 
        } catch (error) {
            res.status(404);
        }
    })
    .put("/ticket/:ticketID", checkRole("BASIC"), async (req, res) => {
        try {
            res.json(await Ticket.updateTicket(req.params.ticketID, req.body)).status(204);
        } catch (error) {
            res.status(404);
        }
    });