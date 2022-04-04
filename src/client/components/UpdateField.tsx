import React, { useState } from "react";
import FieldStyled from "./FieldStyled";
import Input from "./Input";
import { ChangeEvent } from "../types";
import fetchAPI from "../utils/fetchAPI";

interface UpdateFieldProps {
    name: string
    label: string
    value: string | number
    type?: "password" | "select" | "text" | "textarea"
    id: number
    stateChanger?: (key: string, value: string) => void
}

const UpdateField: React.FC<UpdateFieldProps> = ({ name, label, value, type = "text", id, stateChanger, children }) => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false),
        [updatableValue, setUpdatableValue] = useState<string | number>(value),
        toggleUpdating = () => setIsUpdating(!isUpdating),
        updateTicket = async () => {
            const res = await fetchAPI(`ticket/ticket/${id}`, "PUT", { [name]: updatableValue });
        };

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            {
                isUpdating ?
                    <ActiveField name={name} value={value} type={type} updateValue={setUpdatableValue} submitUpdate={updateTicket} deactivate={toggleUpdating} /> :
                    <InactiveField fieldValue={updatableValue} activate={toggleUpdating} />
            }
        </div>
    )
}

export default UpdateField;


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

interface InactiveFieldProps {
    fieldValue: string | number
    activate: () => void
}

const InactiveField: React.FC<InactiveFieldProps> = ({ fieldValue, activate }) => {
    return (
        <>
            <div>{fieldValue}</div>
            <button onClick={activate}>Edit</button>
        </>
    )
}