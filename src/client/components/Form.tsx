import React, { useState } from "react";
import styled from "styled-components";

const FormStyled = styled.form`
    color: var(--light-0);
    display: grid;
    gap: 1rem;
    padding: 0.5rem;
    button {
        color: var(--light-0);
        background: var(--accent-2);
        border: 0;
        max-width: max-content;
        justify-self: center;
        padding: 0.4rem 1rem;
    }
    @media (min-width: 769px) {
        padding: .5rem 20rem;
    }
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
                    child => React.isValidElement(child) ? React.cloneElement(child, { body, stateChanger }) : child
                )
            }
            <button onClick={submitHandler}>Submit</button>
        </FormStyled>
    )
}

export default Form;