import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getTickets } from "../redux/ticketSlice";
import isAuthed from "../utils/isAuthed";
import TicketTile from "../components/TicketTile";
import Waiting from "../svg/Waiting";

const Dashboard: React.FC = () => {
    const { tickets, isSuccess, isError, isLoading } = useAppSelector(state => state.tickets),
        dispatch = useAppDispatch(),
        navigate = useNavigate();

    useEffect(() => {
        if(!isAuthed() || isError) {
            navigate("/login");
            return
        }
        if(tickets.length > 0 || isSuccess) return;
        dispatch(getTickets());
    }, [tickets]);

    return (
        <section>
            {
                !isLoading ? tickets.map(ticket => (
                    <TicketTile key={ticket.id} ticket={ticket} />
                )) :
                <Waiting />
            }
        </section>
    )
}

export default Dashboard;