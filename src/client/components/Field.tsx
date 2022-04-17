import React from "react";
import styled from "styled-components";
import Input from "./Input";
import { ChangeEvent } from "../types";

interface FieldProps {
    name: string
    label: string
    body?: {[index: string]: any}
    type?: "password" | "select" | "text" | "textarea" | "email"
    stateChanger?: (key: string, value: string) => void
}

const Field: React.FC<FieldProps> = ({ name, label, body, type = "text", stateChanger, children }) => {
    const changeHandler = (e: ChangeEvent) => {
        if(!stateChanger) return console.log(`No state changer provided for ${name}`);
        stateChanger(name, e.target.value);
    }

    return (
        <FieldStyled data-field={name}>
            <label htmlFor={name}>{label}</label>
            <Input name={name} value={body && body[name] || ""} type={type} changeHandler={changeHandler}>{children}</Input>
        </FieldStyled>
    )
}

export default Field;

const FieldStyled = styled.div`
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
`;