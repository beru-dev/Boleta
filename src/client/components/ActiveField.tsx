import React from "react";
import styled from "styled-components";
import Input from "./Input";
import { ChangeEvent } from "../types";

interface ActiveFieldProps {
    name: string
    value: string | number
    type?: "password" | "select" | "text" | "textarea"
    updateValue: (newValue: string) =>  void
    submitUpdate: () => void
    deactivate: () => void
}

const ActiveField: React.FC<ActiveFieldProps> = ({ name, type, updateValue, submitUpdate, deactivate, children }) => {
    const changeHandler = (e: ChangeEvent) => {
        updateValue(e.target.value);
    }
    return (
        <>
            <Input name={name} type={type} changeHandler={changeHandler}>{children}</Input>
            <button onClick={submitUpdate}>Update</button>
            <button onClick={deactivate}>Cancel</button>
        </>
    )
}

export default ActiveField;