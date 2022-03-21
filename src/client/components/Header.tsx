import React from "react";
import styled from "styled-components";

const HeaderStyled = styled.header`
    background: var(--dark-1);
    grid-area: header;
    padding: 0.6rem 1rem;
    font-size: 1.5rem;
    font-weight: bold;
`;

const Header: React.FC = () => (
    <HeaderStyled>
        Boleta
    </HeaderStyled>
);

export default Header;