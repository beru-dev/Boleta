import React from "react";
import Footer from "../../src/client/components/Footer";
import { render } from "@testing-library/react";

describe("Footer", () => {
    it("should render the component", () => {
        const { getByText } = render(<Footer />);

        expect(getByText("Footer stuff")).toBeInTheDocument();
    });
});