import React, { useEffect } from "react";
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
        if(ticket) return;
        dispatch(getTicket(ticketID));
    }, [ticket]);

    if(!ticket) return <Waiting />
    const { id, title, ticket_description, ticket_status, ticket_priority, story_points, createdAt, updatedAt,  } = ticket;

    return (
        <section>
            <UpdateField id={id} label="Title" name="title" value={title} />
            <UpdateField id={id} label="Description" name="ticket_description" type="textarea" value={ticket_description} />
            <UpdateField id={id} name="ticket_priority" label="Priority" type="select" value={ticket_priority}>
                <SelectorOptions options={options["priority"]} />
            </UpdateField>
            <UpdateField id={id} name="ticket_status" label="Status" type="select" value ={ticket_status}>
                <SelectorOptions options={options["status"]} />
            </UpdateField>
            <UpdateField id={id} label="Story Points" name="story_points" value={story_points} />
            <div>{createdAt}</div>
            <div>{updatedAt}</div>
        </section>
    )
}

export default Ticket;