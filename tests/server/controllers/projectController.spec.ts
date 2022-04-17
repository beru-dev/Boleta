import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import projectController from "../../../src/server/controllers/projectController";
import { createProject, deleteProject, getAllProjects } from "../../../src/server/models/ProjectModel";
import verifyToken from "../../../src/server/utils/verifyToken";

jest.mock("../../../src/server/utils/verifyToken");
const mockedVerifyToken = verifyToken as jest.Mocked<any>;

jest.mock("../../../src/server/models/ProjectModel");
const mockCreateProject = createProject as jest.Mocked<any>,
    mockDeleteProject = deleteProject as jest.Mocked<any>,
    mockGetAllProjects = getAllProjects as jest.Mocked<any>;

const app = express();
app
    .use(express.json())
    .use("/project", projectController);

describe("/project", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedVerifyToken.mockImplementation((req: Request, res: Response, next: NextFunction) => {
            req.userId = "1";
            req.userRole ="ADMIN";
            next();
        });
    })

    describe("GET", () => {
        it("should send an error message when db call fails", async () => {
            expect.assertions(2);
            mockGetAllProjects.mockImplementation(() => {
                throw new Error("GET Error");
            });

            const response = await request(app)
                .get("/project");

            expect(response.status).toEqual(404);
            expect(response.body).toEqual({ message: "GET Error" });
        });

        it("should retrieve list of projects with status code 200 when user is authenticated", async () => {
            mockGetAllProjects.mockImplementation(() => (["PROJONE", "PROJTWO"]));
            const response = await request(app)
                .get("/project");

            expect(response.status).toEqual(200);
            expect(response.body).toEqual(["PROJONE", "PROJTWO"]);
        });
    });

    describe("POST", () => {
        it("should send an error message when db call fails", async () => {
            expect.assertions(2);
            mockCreateProject.mockImplementation(() => {
                throw new Error("POST Error");
            });

            const response = await request(app)
                .post("/project");

            expect(response.status).toEqual(404);
            expect(response.body).toEqual({ message: "POST Error" });
        });

        it("should return the response from the database on creation", async () => {
            mockCreateProject.mockImplementation(() => "something");
            const response = await request(app)
                .post("/project");

            expect(response.status).toEqual(201);
            expect(response.body).toEqual("something");
        });
    });

    describe("DELETE", () => {
        it("should send an error message when db call fails", async () => {
            expect.assertions(2);
            mockDeleteProject.mockImplementation(() => {
                throw new Error("DELETE Error");
            });

            const response = await request(app)
                .delete("/project");

            expect(response.status).toEqual(404);
            expect(response.body).toEqual({ message: "DELETE Error" });
        });

        it("should call the db delete method", async () => {
            mockDeleteProject.mockImplementation(() => {});
            const response = await request(app)
                .delete("/project");

            expect(mockDeleteProject).toHaveBeenCalled();
            expect(response.status).toEqual(204);
        });
    });
});