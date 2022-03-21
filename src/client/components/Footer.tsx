import React from "react";
import styled from "styled-components";

const FooterStyled = styled.footer`
    background: var(--dark-0);
    color: var(--light-1);
    grid-area: footer;
    padding: 1rem;
`;

const Footer: React.FC = () => {
    return (
        <FooterStyled>
            Footer stuff
        </FooterStyled>
    )
}

export default Footer;