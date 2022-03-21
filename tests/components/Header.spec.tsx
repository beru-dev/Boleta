import React from "react";
import Header from "../../src/client/components/Header";
import { render } from "@testing-library/react";

describe("Header", () => {
    it("should render the component", () => {
        const { getByText } = render(<Header />);

        expect(getByText("Josh's Ticket App")).toBeInTheDocument();
    });
});