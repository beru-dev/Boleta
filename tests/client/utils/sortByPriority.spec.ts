import sortByPriority, { Priorityful } from "../../../src/client/utils/sortByPriority";

describe("sortByPriority", () => {
    it("should sort tickets by priority with High at the start and Low at the end", () => {
        const tickets: Priorityful[] = [
            { ticket_priority: "Medium" },
            { ticket_priority: "Low" },
            { ticket_priority: "Medium" },
            { ticket_priority: "Medium" },
            { ticket_priority: "High" },
            { ticket_priority: "Medium" }
        ],
            expected = [
                { ticket_priority: "High" },
                { ticket_priority: "Medium" },
                { ticket_priority: "Medium" },
                { ticket_priority: "Medium" },
                { ticket_priority: "Medium" },
                { ticket_priority: "Low" }
            ];

        expect(sortByPriority(tickets)).toEqual(expected);
    });
});