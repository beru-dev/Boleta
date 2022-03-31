import Ticket from "./TicketEntity";
import Sequelize from "sequelize";
import Project from "./ProjectEntity";
import User from "./UserEntity";

const Op = Sequelize.Op;

export default {
    getAllTickets: async () => {
        try {
            return await Ticket.findAll();
        } catch (error) {
            console.error(error);
        }
    },

    getTicket: async (ticket: string) => {
        return await Ticket.findOne({
            where: {
                ticket_number: ticket
            }
        });
    },

    getTicketsByProject: async (project: string) => {
        return await Ticket.findAll({
            where: {
                ticket_number: { [Op.startsWith]: `${project}-` }
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
            submitter
        }: any) => {
        const projectExists = await Project.count({ where: { name: project_name }}),
            ticketCount = await Ticket.count({
                where: {
                    ticket_number: { [Op.startsWith]: `${project_name}-` }
                }
            }),
            submittingUser: any = await User.findOne({
                where: { user_name: submitter },
                attributes: ["id"]
            });

        if(!projectExists) throw new Error(`Project ${project_name} does not exist`);
        if(!submittingUser) throw new Error(`Submitter ${submitter} does not exist`);
        if(typeof story_points !== "number") {
            const storyPointsNumber = parseInt(story_points);
            if(isNaN(storyPointsNumber)) throw new Error(`Story points value ${story_points} cannot be parsed to a number.`);
            story_points = storyPointsNumber;
        }

        try {
            return await Ticket.create({
                ticket_number: `${project_name}-${ticketCount + 1}`,
                title,
                ticket_status: "To Do",
                ticket_priority,
                story_points,
                ticket_description,
                submitter_id: submittingUser.id
            });
        } catch (error) {
            console.error(error)
        }
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