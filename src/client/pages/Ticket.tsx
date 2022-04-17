import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getTicket } from "../redux/ticketSlice";
import UpdateField from "../components/UpdateField";
import SelectorOptions from "../components/SelectorOptions";
import Waiting from "../svg/Waiting";
import options from "../data/optionTypes.json";

const Ticket: React.FC = () => {
    const dispatch = useAppDispatch(),
        ticket = useAppSelector(state => state.tickets.activeTicket),
        { ticketID } = useParams();

    if(!ticketID) return <div>{`Error retrieving ticket ${ticketID}`}</div>

    useEffect(() => {
        dispatch(getTicket(ticketID));
    }, []);

    if(!ticket) return <Waiting />
    const { id, title, ticket_description, ticket_status, ticket_priority, story_points, createdAt, updatedAt, ticket_number } = ticket;

    return (
        <StyledTicket>
            <fieldset className="ticket-title">
                <p>{ticket_number}</p>
                <UpdateField id={id} name="title" value={title} valueDisplayElement="h1" />
            </fieldset>
            <fieldset className="ticket-info">
                <UpdateField id={id} name="ticket_priority" label="Priority" type="select" value={ticket_priority}>
                    <SelectorOptions options={options["priority"]} />
                </UpdateField>
                <UpdateField id={id} name="ticket_status" label="Status" type="select" value ={ticket_status}>
                    <SelectorOptions options={options["status"]} />
                </UpdateField>
                <UpdateField id={id} label="Story Points" name="story_points" value={story_points} />
            </fieldset>
            <fieldset className="ticket-people">
                <div>Assignee:</div>
                <div>Submitter:</div>
            </fieldset>
            <fieldset className="ticket-dates">
                <div>Created: {`${new Date(createdAt)}`}</div>
                <div>Updated: {`${new Date(updatedAt)}`}</div>
            </fieldset>
            <fieldset className="ticket-description">
                <UpdateField id={id} label="Description" name="ticket_description" type="textarea" orientation="vertical" value={ticket_description} valueDisplayElement="div" />
            </fieldset>
        </StyledTicket>
    )
}

export default Ticket;

const StyledTicket = styled.section`
    display: grid;
    grid-template:
        "title title"
        "info people"
        "info dates"
        "description description" / 1fr 1fr;
    gap: 2rem;
    fieldset {
        border: none;
        margin: 0;
        padding: 0;
        & > div {
            margin: 0.5rem 0;
        }
    }
    .ticket-title {
        grid-area: title;
    }
    .ticket-info {
        grid-area: info;
    }
    .ticket-people {
        grid-area: people;
    }
    .ticket-dates {
        grid-area: dates;
    }
    .ticket-description {
        grid-area: description;
    }
`;