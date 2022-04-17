import "@testing-library/jest-dom";

declare module "express" {
    export interface Request {
        userId?: string
        userRole?: string
    }
}