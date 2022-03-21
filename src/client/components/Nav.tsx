import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavStyled = styled.nav`
    display: flex;
    background: var(--accent-2);
    color: var(--light-0);
    grid-area: nav;
    padding: .5rem 1rem;
    a {
        text-decoration: none;
        color: var(--light-0);
        background: var(--accent-1);
        padding: 0.4rem;
        border-radius: 0.2rem;
    }
`;

const Nav: React.FC = () => {
    return (
        <NavStyled>
            <Link to="/create">Create</Link>
        </NavStyled>
    )
}

export default Nav;