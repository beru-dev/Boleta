import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ActiveField from "./ActiveField";
import InactiveField from "./InactiveField";
import ItemWrapper, { Orientation } from "./styled/ItemWrapper";
import fetchAPI from "../utils/fetchAPI";
import { ValueType, InputType } from "../types";

interface UpdateFieldProps {
    name: string
    label?: string
    value: string | number
    type?: InputType
    valueDisplayElement?: ValueType
    orientation?: Orientation
    id: number
}

const UpdateField: React.FC<UpdateFieldProps> = ({ name, label, value, type = "text", valueDisplayElement, orientation, id, children }) => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false),
        [updatableValue, setUpdatableValue] = useState<string | number>(value),
        toggleUpdating = () => setIsUpdating(!isUpdating),
        rand = Math.floor(Math.random() * 1000),
        updateTicket = async () => {
            const res = await fetchAPI(`ticket/id/${id}`, "PUT", { [name]: updatableValue });
            console.log(res)
        };

    useEffect(() => {
        setUpdatableValue(value);
    }, [value]);

    return (
        <UpdateFieldStyled orientation={!label ? "vertical" : orientation}>
            { label && <label htmlFor={name}>{label}:</label>}
            {
                isUpdating ?
                    <ActiveField name={name} value={updatableValue} type={type} updateValue={setUpdatableValue} submitUpdate={updateTicket} deactivate={toggleUpdating} children={children} /> :
                    <InactiveField fieldValue={updatableValue} ValueElement={valueDisplayElement} activate={toggleUpdating} />
            }
        </UpdateFieldStyled>
    )
}

export default UpdateField;

const UpdateFieldStyled = styled(ItemWrapper)`
    display: grid;
    grid-template-columns: ${({ orientation = "horizontal" }) => orientation === "horizontal" ? "8rem 1fr" : "1fr"};
    label {
        color: var(--light-2);
    }
`;