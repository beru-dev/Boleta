export interface Ticket {
    id: number
    ticket_number: string
    title: string
    ticket_status: string
    ticket_priority: string
    story_points: number
    createdAt: string
    updatedAt: string
    assignee_id: number
    ticket_description: string
    submitter_id: number
}

interface User {

}

interface Project {
    name: string
}