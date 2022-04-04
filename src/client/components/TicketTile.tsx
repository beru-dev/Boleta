import React from "react";
import styled from "styled-components";
import { Ticket } from "../../types/ModelTypes";
import { Link } from "react-router-dom";

const TileStyled = styled.article`
    padding: 1rem 2rem;
    border-radius: 0.3rem;
    margin: 1rem;
    background: var(--dark-1);
    box-shadow: 0.1rem 0.2rem 0.8rem black;
    &.priority-done {
        border-left: .5rem solid gray;
    }
    &.priority-low {
        border-left: .5rem solid green;
    }
    &.priority-medium {
        border-left: .5rem solid yellow;
    }
    &.priority-high {
        border-left: .5rem solid red;
    }
    a {
        text-decoration: none;
        color: var(--light-1);
        &:visited, &:hover {
            color: var(--light-2);
        }
    }
`;

interface TicketTileProps {
    ticket: Ticket
}

const TicketTile: React.FC<TicketTileProps> = ({ ticket }) => {
    const { ticket_number, title, ticket_status, ticket_priority } = ticket,
        priority =
            ticket_status === "Done" ? "priority-done" :
            ticket_priority === "Low" ? "priority-low" :
            ticket_priority === "Medium" ? "priority-medium" :
            ticket_priority === "High" ? "priority-high" : "";

    return (
        <TileStyled className={priority}>
            <Link to={`/ticket/${ticket_number}`}>{ticket_number}</Link>
            <h3>{title}</h3>
        </TileStyled>
    )
}

export default TicketTile;