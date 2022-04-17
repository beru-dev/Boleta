export interface Ticket {
    id: number
    ticket_number: string
    title: string
    ticket_status: Status
    ticket_priority: Priority
    story_points: number
    createdAt: string
    updatedAt: string
    assignee_id: number
    ticket_description: string
    submitter_id: number
}

export type Status = "To Do" | "In Progress" | "Review" | "Done";

export type Priority = "High" | "Medium" | "Low";

interface User {

}

interface Project {
    name: string
}