import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";

const renderWithRouter = (children: React.ReactNode) => {
    return render(
        <Router>
            {children}
        </Router>
    )
}

export { renderWithRouter };