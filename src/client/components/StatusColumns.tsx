import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import { Ticket, Status } from "../../types/ModelTypes";
import splitTicketsByStatus, { TicketsByStatus } from "../utils/splitTicketsByStatus";
import fetchAPI from "../utils/fetchAPI";

interface StatusColumnsProps {
    tickets: Ticket[]
}

const StatusColumns: React.FC<StatusColumnsProps> = ({ tickets }) => {
    const [columns, setColumns] = useState<TicketsByStatus<Ticket>>(splitTicketsByStatus(tickets)),
        onDragEnd = (result: DropResult) => {
            const { destination, source, draggableId } = result;
            if(
                !columns ||
                !destination ||
                destination.droppableId === source.droppableId
            ) return;

            fetchAPI(`ticket/id/${draggableId}`, "PUT", { ticket_status: destination.droppableId })
            const newSourceColumn = columns[source.droppableId as Status],
                [ticketToMove] = newSourceColumn.splice(source.index, 1);

            setColumns({
                ...columns,
                [source.droppableId]: newSourceColumn,
                [destination.droppableId]: [
                    ...columns[destination.droppableId as Status],
                    ...[{
                        ...ticketToMove,
                        ticket_status: destination.droppableId as Status
                    }]
                ]
            })
        };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <StatusColumnsStyled>
                {
                    columns && (Object.keys(columns) as Status[])
                        .map(column=> <Column key={column} tickets={columns[column]} name={column} />)
                }
            </StatusColumnsStyled>
        </DragDropContext>
    )
}

export default StatusColumns;

const StatusColumnsStyled = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: fit-content() 1fr;
    gap: 1rem;
`;