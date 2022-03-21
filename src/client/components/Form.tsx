import React, { useState } from "react";
import styled from "styled-components";

const FormStyled = styled.form`
    color: var(--light-0);
    padding: .5rem 20rem;
    display: grid;
    gap: 1rem;
`;

interface FormProps {
    formDataHandler: (data: any) => void
}

const Form: React.FC<FormProps> = ({ formDataHandler, children }) => {
    const [body, setBody] = useState<{[index: string]: any}>({}),
        [message, setMessage] = useState(""),

        submitHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            try {
                formDataHandler(body);
            } catch (error) {
                console.error(error);
                setMessage("Unable to complete");
            }
        },

        stateChanger = (key: string, value: any) => setBody({ ...body, [key]: value });

    return (
        <FormStyled>
            {
                message && <div>{message}</div> ||
                React.Children.map(
                    children,
                    child => React.isValidElement(child) ? React.cloneElement(child, { stateChanger }) : child
                )
            }
            <button onClick={submitHandler}>Submit</button>
        </FormStyled>
    )
}

export default Form;