import Ticket from "./TicketEntity";
import Sequelize from "sequelize";
import Project from "./ProjectEntity";
import User from "./UserEntity";
import processQuery from "../utils/processQuery";

const Op = Sequelize.Op;

export const getTickets = async (query: any) => {
    try {
        return await Ticket.findAll(processQuery(query));
    } catch (error) {
        console.error(error);
    }
};

export const createTicket = async ({
        project_name,
        title,
        ticket_priority,
        story_points,
        ticket_description,
        submitter
    }: any) => {
    const projectExists = await Project.count({ where: { name: project_name }});
    if(!projectExists) throw new Error(`Project ${project_name} does not exist`);

    const ticketCount = await Ticket.count({
            where: {
                ticket_number: { [Op.startsWith]: `${project_name}-` }
            }
        }),
        submittingUser: any = await User.findOne({
            where: { user_name: submitter },
            attributes: ["id"]
        });

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
        console.error(error);
    }
};

export const updateTicket = async (id: string, newData: object) => {
    // VALIDATE INPUTS!!!!
    return await Ticket.update(
        newData,
        {
            returning: true,
            where: { id }
        }
    )
};