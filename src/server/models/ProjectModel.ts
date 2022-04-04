import Project from "./ProjectEntity";
import Sequelize from "sequelize";

const Op = Sequelize.Op;

export const getAllProjects = async () => {
    return await Project.findAll({ attributes: ["name"] });
};

export const createProject = async (name: string) => {
    if(typeof name !== "string") throw new Error(`Invalid project name: ${name}`);
    return await Project.create({ name });
};

export const deleteProject = async (name: string) => {
    if(typeof name !== "string") throw new Error(`Invalid project name: ${name}`);
    return await Project.destroy({ where: { name } });
}