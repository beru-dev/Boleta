import splitTicketsByStatus, { Statusful } from "../../../src/client/utils/splitTicketsByStatus";

describe("splitTicketsByStatus", () => {
    it("should", () => {
        const tickets: Statusful[] = [
            { ticket_status: "Done" },
            { ticket_status: "To Do" },
            { ticket_status: "Done" },
            { ticket_status: "Review" },
            { ticket_status: "Done" },
            { ticket_status: "In Progress" },
            { ticket_status: "To Do" }
        ]

        expect(splitTicketsByStatus(tickets)["To Do"].length).toEqual(2);
        expect(splitTicketsByStatus(tickets)["In Progress"].length).toEqual(1);
        expect(splitTicketsByStatus(tickets)["Review"].length).toEqual(1);
        expect(splitTicketsByStatus(tickets)["Done"].length).toEqual(3);
    });
});