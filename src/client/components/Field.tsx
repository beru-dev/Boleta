import React from "react";
import Input from "./Input";
import { ChangeEvent } from "../types";

interface FieldProps {
    name: string
    label: string
    type?: "password" | "select" | "text" | "textarea" | "email"
    stateChanger?: (key: string, value: string) => void
}

const Field: React.FC<FieldProps> = ({ name, label, type = "text", stateChanger, children }) => {
    const changeHandler = (e: ChangeEvent) => {
        if(!stateChanger) return console.log(`No state changer provided for ${name}`);
        stateChanger(name, e.target.value);
    }

    return (<>
        <label htmlFor={name}>{label}</label>
        <Input name={name} type={type} changeHandler={changeHandler}>{children}</Input>
    </>)
}

export default Field;