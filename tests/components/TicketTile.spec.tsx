import React from "react";
import TicketTile from "../../src/client/components/TicketTile";
import { renderWithRouter } from "../config/testingUtils";

describe("TicketTile", () => {
    it("should render the component", () => {
        const { getByRole } = renderWithRouter(<TicketTile project_name="JOSH" ticket_number="1" title="Some Ticket" />),
            ticketLink = getByRole("link");

        expect(ticketLink).toBeInTheDocument();
        expect(ticketLink).toHaveTextContent("JOSH-1");
    });
});