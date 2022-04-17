import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getTickets } from "../redux/ticketSlice";
import isAuthed from "../utils/isAuthed";
import sortByPriority from "../utils/sortByPriority";
import TicketTile from "../components/TicketTile";
import Waiting from "../svg/Waiting";

const Dashboard: React.FC = () => {
    const { tickets, isSuccess, isError, isLoading } = useAppSelector(state => state.tickets),
        { name } = useAppSelector(state => state.user.user),
        dispatch = useAppDispatch(),
        navigate = useNavigate();

    useEffect(() => {
        if(!isAuthed() || isError) {
            navigate("/login");
            return
        }
        if(tickets.length > 0 || isSuccess) return;
        dispatch(getTickets(`?active=true&assignee=${name}`));
    }, [tickets]);

    return (
        <section>
            {
                !isLoading ? sortByPriority(tickets).map(ticket => (
                    <TicketTile key={ticket.id} ticket={ticket} />
                )) :
                <Waiting />
            }
        </section>
    )
}

export default Dashboard;