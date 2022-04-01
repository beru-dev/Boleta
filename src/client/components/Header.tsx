import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderStyled = styled.header`
    background: var(--dark-2);
    grid-area: header;
    padding: 0.6rem 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    a {
        text-decoration: none;
        color: var(--light-1);
    }
`;

const Header: React.FC = () => (
    <HeaderStyled>
        <Link to="/">Boleta</Link>
    </HeaderStyled>
);

export default Header;