import Project from "./ProjectEntity";
import Sequelize from "sequelize";

const Op = Sequelize.Op;

export default {
    createProject: async (name: string) => {
        if(typeof name !== "string") throw new Error(`Invalid project name: ${name}`);
        return await Project.create({ name })
    },

    deleteProject: async (name: string) => {
        if(typeof name !== "string") throw new Error(`Invalid project name: ${name}`);
        return await Project.destroy({ where: { name } })
    }
}