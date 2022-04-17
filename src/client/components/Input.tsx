import React from "react";
import { ChangeEvent } from "../types";

interface InputProps {
    name: string
    value?: string | number
    type?: "password" | "select" | "text" | "textarea" | "email"
    changeHandler: (e: ChangeEvent) => void
}

const Input: React.FC<InputProps> = ({ type, value = "", name, changeHandler, children }) => {
    return type === "select" ? <select name={name} value={value} onChange={changeHandler}>{children}</select> :
        type === "textarea" ? <textarea name={name} value={value} onChange={changeHandler}></textarea> :
        <input name={name} value={value} type={type} onChange={changeHandler} />
}

export default Input;