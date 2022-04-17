import { Op, Includeable } from "sequelize";

type ValidQueries = "active" | "assignee" | "id" | "limit" | "offset" | "project" | "search" | "submitter" | "ticket";

type Queries = {
    [key in ValidQueries]?: string
}

export default (query: Queries) => {
    const { active, assignee, id, limit, offset, project, search, submitter, ticket } = query,
        where: any = {
            [Op.and]: {}
        },
        include: Includeable[] = [];

    if(id) {
        where[Op.and].id = id;
    }

    if(project) {
        where[Op.and].ticket_number = { [Op.startsWith]: `${project}-` };
    }

    if(ticket) {
        where[Op.and].ticket_number = ticket;
    }

    if(active === "true") {
        where.ticket_status = {
            [Op.ne]: "Done"
        };
    }

    if(assignee) {
        include.push({
            association: "assignee",
            attributes: ["user_name"],
            where: {
                user_name: assignee
            }
        });
    }

    if(submitter) {
        include.push({
            association: "submitter",
            attributes: ["user_name"],
            where: {
                user_name: submitter
            }
        });
    }

    return {
        where,
        include,
        limit: limit && parseInt(limit) || 10,
        offset: offset && parseInt(offset) || 0
    }
}