import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getTickets } from "../redux/ticketSlice";
import StatusColumns from "../components/StatusColumns";
import Waiting from "../svg/Waiting";

const Project: React.FC = () => {
    const { tickets, isSuccess, isError, isLoading } = useAppSelector(state => state.tickets),
    dispatch = useAppDispatch(),
    { projectID } = useParams();

    useEffect(() => {
        dispatch(getTickets(`?project=${projectID}`));
    }, []);

    return isLoading ? <Waiting /> : <StatusColumns tickets={tickets} />
}

export default Project;