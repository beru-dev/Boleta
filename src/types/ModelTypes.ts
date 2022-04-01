export interface Ticket {
    id: number
    ticket_number: string
    title: string
    ticket_status: string
    ticket_priority: string
    story_points: number
    createdAt: string
    created_by_id: number
    updatedAt: number
    assignee_id: number
    ticket_description: string
    submitter_id: number
    projectId: number | null
}

interface User {

}

interface Project {
    name: string
}