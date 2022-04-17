import React from "react";
import styled from "styled-components";
import ItemWrapper from "./styled/ItemWrapper";
import Input from "./Input";
import { ChangeEvent, InputType } from "../types";

interface ActiveFieldProps {
    name: string
    value: string | number
    type?: InputType
    updateValue: (newValue: string) =>  void
    submitUpdate: () => void
    deactivate: () => void
}

const ActiveField: React.FC<ActiveFieldProps> = ({ name, value, type, updateValue, submitUpdate, deactivate, children }) => {
    const changeHandler = (e: ChangeEvent) => {
        updateValue(e.target.value);
    }
    return (
        <ActiveFieldStyled orientation={type === "textarea" ? "vertical" : "horizontal"}>
            <Input name={name} value={value} type={type} changeHandler={changeHandler}>{children}</Input>
            <button onClick={submitUpdate}>Update</button>
            <button onClick={deactivate}>Cancel</button>
        </ActiveFieldStyled>
    )
}

export default ActiveField;

const ActiveFieldStyled = styled(ItemWrapper)`
    display: ${({ orientation }) => orientation === "horizontal" ? "initial" : "grid"};
    grid-template: 
        "text buttonone" fit-content(1rem)
        "text buttontwo" fit-content(1rem)
        "text ." / 1fr fit-content(1rem);
    margin: ${({ orientation }) => orientation === "horizontal" ? "0" : "0.5rem 0 0 0"};
    input, select, textarea {
        background: var(--dark-3);
        color: var(--light-1);
        border: 0;
    }
    textarea {
        display: block;
        grid-area: text;
        background: var(--dark-2);
        padding: 0.5rem 0.8rem;
    } 
    button {
        display: inline;
        &:nth-of-type(1) {
            grid-area: buttonone;
        }
        &:nth-of-type(2) {
            grid-area: buttontwo;
        }
    }
`;