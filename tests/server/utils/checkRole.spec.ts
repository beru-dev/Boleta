import { Request, Response, NextFunction } from 'express';
import checkRole from "../../../src/server/utils/checkRole";

interface MockRequest extends Partial<Request> {
    userRole?: string
}

describe("checkRole", () => {
    let mockRequest: MockRequest,
        mockResponse: Partial<Response>,
        mockNext: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            send: jest.fn(),
            status: jest.fn()
        }
    });

    it("should deny request when userRole not provided", () => {
        const checkRoleMiddleware = checkRole("ADMIN"),
            expectedResponse = { message: "Insufficient permission." };

        checkRoleMiddleware(mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.send).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(401);
    });

    it("should deny request when userRole is not high enough level", () => {
        const checkRoleMiddleware = checkRole("ADMIN"),
            expectedResponse = { message: "Insufficient permission." };
        mockRequest = { userRole: "BASIC" }

        checkRoleMiddleware(mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.send).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(401);
    });

    it("should allow the request to proceed if provided userRole is high enough", () => {
        const checkRoleMiddleware = checkRole("ADMIN");
        mockRequest = { userRole: "ADMIN" }

        checkRoleMiddleware(mockRequest as Request, mockResponse as Response, mockNext);
        expect(mockNext).toHaveBeenCalled();
    });
});