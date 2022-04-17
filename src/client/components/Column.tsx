import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import DraggableTicketTile from "./DraggableTicketTile";
import { Ticket } from "../../types/ModelTypes";

interface ColumnsProps {
    tickets: Ticket[]
    name: string
}

const Column: React.FC<ColumnsProps> = ({ tickets, name }) => {
    return (
        <>
            <ColumnHeaderStyled>{name}</ColumnHeaderStyled>
            <Droppable droppableId={name}>
                {(provided) => (
                    <ColumnStyled ref={provided.innerRef} {...provided.droppableProps}>
                        { tickets.map((ticket, index) => (<DraggableTicketTile key={ticket.id} ticket={ticket} index={index} />)) }
                        { provided.placeholder }
                    </ColumnStyled>
                )}
            </Droppable>
        </>
    )
}

export default Column;

const ColumnStyled = styled.section`
    background-color: var(--dark-2);
    border-radius: .2rem;
    grid-row: 2/3;
`;

const ColumnHeaderStyled = styled.h2`
    grid-row: 1/2;
    margin: 1rem 0 0 1rem;
    text-transform: uppercase;
    font-size: .9rem;
`