import React from "react";
import TicketTile from "../../../src/client/components/TicketTile";
import { renderWithRouter } from "../../config/testingUtils";

describe("TicketTile", () => {
    it("should render the component", () => {
        const { getByRole } = renderWithRouter(<TicketTile ticket={{
            ticket_number: "JOSH-1",
            title: "Some Ticket",
            ticket_status: "To Do",
            ticket_priority: "Medium",
            assignee_id: 1,
            createdAt: "",
            id: 1,
            story_points: 1,
            submitter_id: 1,
            ticket_description: "",
            updatedAt: ""
        }} />),
            ticketLink = getByRole("link");

        expect(ticketLink).toBeInTheDocument();
        expect(ticketLink).toHaveTextContent("JOSH-1");
    });
});