import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import projectController from "../../../src/server/controllers/projectController";
import { createProject, deleteProject, getAllProjects } from "../../../src/server/models/ProjectModel";
import verifyToken from "../../../src/server/utils/verifyToken";

declare module "express" {
    export interface Request {
        userId?: string
        userRole?: string
    }
}

jest.mock("../../../src/server/utils/verifyToken");
const mockedVerifyToken = verifyToken as jest.Mocked<any>;

jest.mock("../../../src/server/models/ProjectModel");
const mockCreateProject = createProject as jest.Mocked<any>,
    mockDeleteProject = deleteProject as jest.Mocked<any>,
    mockGetAllProjects = getAllProjects as jest.Mocked<any>;

const app = express();
app.use("/project", projectController);

describe("/project", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("GET", () => {
        it("should retrieve list of projects with status code 200 when user is authenticated", async () => {
            mockedVerifyToken.mockImplementation((req: Request, res: Response, next: NextFunction) => {
                req.userId = "1";
                req.userRole ="ADMIN";
                next();
            });
            mockGetAllProjects.mockImplementation(() => (["PROJONE", "PROJTWO"]));
            const response = await request(app)
                .get("/project")

            expect(response.status).toEqual(200);
            expect(response.body).toEqual(["PROJONE", "PROJTWO"]);
        });
    });

    describe("POST", () => {
        it("", async () => {
            expect(1).toEqual(1);
        });
    });

    describe("DELETE", () => {
        it("", async () => {
            expect(1).toEqual(1);
        });
    });
});