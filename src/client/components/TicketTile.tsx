import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TileStyled = styled.article`
    padding: 1rem 2rem;
    a {
        text-decoration: none;
        color: var(--light-1);
        &:visited, &:hover {
            color: var(--light-2);
        }
    }
`;

interface TicketTileProps {
    project_name: string
    ticket_number: string
    title: string
}

const TicketTile: React.FC<TicketTileProps> = ({ project_name, ticket_number, title }) => (
    <TileStyled>
        <Link to={`/ticket/${project_name}-${ticket_number}`}>{`${project_name}-${ticket_number}`}</Link>
        <h2>{title}</h2>
    </TileStyled>
)

export default TicketTile;