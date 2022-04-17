import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import ticketController from "../../../src/server/controllers/ticketController";
import { createTicket, getTickets, updateTicket } from "../../../src/server/models/TicketModel";
import verifyToken from "../../../src/server/utils/verifyToken";

jest.mock("../../../src/server/utils/verifyToken");
const mockedVerifyToken = verifyToken as jest.Mocked<any>;

jest.mock("../../../src/server/models/ProjectModel");
const mockCreateTicket = createTicket as jest.Mocked<any>,
    mockGetTickets = getTickets as jest.Mocked<any>,
    mockUpdateTicket = updateTicket as jest.Mocked<any>;

const app = express();
app
    .use(express.json())
    .use("/project", ticketController);

describe("/ticket", () => {
    it("should", () => {
        expect(1).toEqual(1);
    });
});