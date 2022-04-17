import { Status } from "../../types/ModelTypes";

export interface Statusful {
    ticket_status: Status
}

export type TicketsByStatus<T> = {[key in Status]: T[]}

export default <T extends Statusful>(ticketList: T[]): TicketsByStatus<T> => {
    const todo: T[] = [],
        inProgress: T[] = [],
        review: T[] = [],
        done: T[] = [];

    ticketList.forEach((ticket) => {
        const { ticket_status } = ticket;

        ticket_status === "To Do" ? todo.push(ticket) :
        ticket_status === "In Progress" ? inProgress.push(ticket) :
        ticket_status === "Review" ? review.push(ticket) :
            done.push(ticket);
    });

    return {
        ["To Do"]: todo,
        ["In Progress"]: inProgress,
        ["Review"]: review,
        ["Done"]: done
    }
}