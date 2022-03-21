import React from "react";
import { ChangeEvent } from "../types";

interface InputProps {
    name: string
    type?: "password" | "select" | "text" | "textarea" | "email"
    changeHandler: (e: ChangeEvent) => void
}

const Input: React.FC<InputProps> = ({ type, name, changeHandler, children }) => {
    return type === "select" ? <select name={name} onChange={changeHandler}>{children}</select> :
        type === "textarea" ? <textarea name={name} onChange={changeHandler}></textarea> :
        <input name={name} type={type} onChange={changeHandler} />
}

export default Input;