import { Priority } from "../../types/ModelTypes";

export interface Priorityful {
    ticket_priority: Priority
}

export default <T extends Priorityful>(tickets: T[]): T[] => {
    return [...tickets].sort((a, b) => PriorityOrder[a.ticket_priority] - PriorityOrder[b.ticket_priority])
}

enum PriorityOrder {
    "High" = 1,
    "Medium",
    "Low"
}