import React, { useState } from "react";
import styled from "styled-components";
import ActiveField from "./ActiveField";
import InactiveField from "./InactiveField";
import fetchAPI from "../utils/fetchAPI";

interface UpdateFieldProps {
    name: string
    label: string
    value: string | number
    type?: "password" | "select" | "text" | "textarea"
    id: number
}

const UpdateField: React.FC<UpdateFieldProps> = ({ name, label, value, type = "text", id, children }) => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false),
        [updatableValue, setUpdatableValue] = useState<string | number>(value),
        toggleUpdating = () => setIsUpdating(!isUpdating),
        updateTicket = async () => {
            const res = await fetchAPI(`ticket/ticket/${id}`, "PUT", { [name]: updatableValue });
        };

    return (
        <UpdateFieldStyled>
            <label htmlFor={name}>{label}</label>
            {
                isUpdating ?
                    <ActiveField name={name} value={value} type={type} updateValue={setUpdatableValue} submitUpdate={updateTicket} deactivate={toggleUpdating} children={children} /> :
                    <InactiveField fieldValue={updatableValue} activate={toggleUpdating} />
            }
        </UpdateFieldStyled>
    )
}

export default UpdateField;

const UpdateFieldStyled = styled.div`
    display: grid;
    grid-template-columns: 8rem 1fr;
    input, select, textarea {
        background: var(--dark-3);
        color: var(--light-1);
        border: 0;
    }
    textarea {
        display: block;
    } 
`