import React from "react";
import styled from "styled-components";

const FooterStyled = styled.footer`
    background: var(--dark-2);
    color: var(--light-1);
    grid-area: footer;
    padding: 1rem;
    text-align: center;
`;

const Footer: React.FC = () => {
    return (
        <FooterStyled>
            © 2022 Josh Berumen
        </FooterStyled>
    )
}

export default Footer;