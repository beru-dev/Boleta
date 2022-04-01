import React, { useState } from "react";
import FieldStyled from "./FieldStyled";
import Input from "./Input";
import { ChangeEvent } from "../types";

interface UpdateFieldProps {
    name: string
    label: string
    value: string | number
    type?: "password" | "select" | "text" | "textarea"
    stateChanger?: (key: string, value: string) => void
}

const UpdateField: React.FC<UpdateFieldProps> = ({ name, label, value, type = "text", stateChanger, children }) => {
    const [updating, setUpdating] = useState<boolean>(false),
        [updatableValue, setUpdatableValue] = useState<string | number>(value),

        changeHandler = (e: ChangeEvent) => {
            if(!stateChanger) return console.log(`No state changer provided for ${name}`);
            setUpdatableValue(e.target.value);
            stateChanger(name, e.target.value);
        }

    return (
        <FieldStyled>
            <label onBlur={() => setUpdating(false)} htmlFor={name}>{label}</label>
            {
                updating ?
                    <Input name={name} type={type} changeHandler={changeHandler}>{children}</Input> :
                    <div onDoubleClick={() => setUpdating(true)}>{updatableValue}</div>
            }
        </FieldStyled>
    )
}

export default UpdateField;