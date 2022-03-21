import Ticket from "./TicketEntity";
import Sequelize from "sequelize";
import Project from "./ProjectEntity";
import User from "./UserEntity";

const Op = Sequelize.Op;

export default {
    getAllTickets: async () => await Ticket.findAll(),

    getTicket: async (ticket: string) => {
        const [project_name, ticket_number] = ticket.split("-");
        return await Ticket.findOne({
            where: {
                [Op.and] :{
                    project_name,
                    ticket_number
                }
            }
        });
    },

    getTicketsByProject: async (project: string) => {
        return await Ticket.findAll({
            where: {
                project_name: { [Op.like]: project } 
            }
        });
    },

    getTicketsByAssignee: async (assignee: string) => {
        return await Ticket.findAll({
            include: {
                association: "assignee",
                attributes: ["user_name"],
                where: {
                    user_name: assignee
                }
            }
        });
    },

    getTicketsBySubmitter: async (submitter: string) => {
        return await Ticket.findAll({
            include: {
                association: "submitter",
                attributes: ["user_name"],
                where: {
                    user_name: submitter
                }
            }
        });
    },

    createTicket: async ({
            project_name,
            title,
            ticket_priority,
            story_points,
            ticket_description,
            // assignee,
            submitter
        }: any) => {
        const projectExists = await Project.count({ where: { name: project_name }}),
            ticket_number = await Ticket.count({ where: { project_name } }),
            // assignedUser: any = await User.findOne({
            //     where: { user_name: assignee },
            //     attributes: ["id"]
            // }),
            submittingUser: any = await User.findOne({
                where: { user_name: submitter },
                attributes: ["id"]
            });

        if(!projectExists) throw new Error(`Project ${project_name} does not exist`);
        // if(!assignedUser) throw new Error(`Assign ${assignee} does not exist`);
        if(!submittingUser) throw new Error(`Submitter ${submitter} does not exist`);
        if(typeof story_points !== "number") {
            const storyPointsNumber = parseInt(story_points);
            if(isNaN(storyPointsNumber)) throw new Error(`Story points value ${story_points} cannot be parsed to a number.`);
            story_points = storyPointsNumber;
        }

        return await Ticket.create({
            project_name,
            ticket_number: ticket_number + 1,
            title,
            ticket_status: "To Do",
            ticket_priority,
            story_points,
            ticket_description,
            // assignee_id: assignedUser.id,
            submitter_id: submittingUser.id
        });
    },

    updateTicket: async (id: string, newData: object) => {
        // VALIDATE INPUTS!!!!
        return await Ticket.update(
            newData,
            {
                returning: true,
                where: { id }
            }
        )
    }
}