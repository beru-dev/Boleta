import React from "react";
import styled from "styled-components";
import ItemWrapper from "./styled/ItemWrapper";
import { ValueType } from "../types"

interface InactiveFieldProps {
    fieldValue: string | number
    ValueElement?: ValueType
    activate: () => void
}

const InactiveField: React.FC<InactiveFieldProps> = ({ fieldValue, ValueElement = "span", activate }) => {
    return (
        <InactiveFieldStyled orientation={ValueElement === "div" ? "vertical" : "horizontal"}>
            <ValueElement>{fieldValue}</ValueElement>
            <button onClick={activate}>Edit</button>
        </InactiveFieldStyled>
    )
}

export default InactiveField;

const InactiveFieldStyled = styled(ItemWrapper)`
    display: ${({ orientation }) => orientation === "horizontal" ? "initial" : "grid"};
    grid-template: 
        "text buttonone" fit-content(1rem)
        "text ." / 1fr fit-content(1rem);
    margin: ${({ orientation }) => orientation === "horizontal" ? "0" : "0.5rem 0 0 0"};
    h1 {
        display: inline;
    }
    > div {
        grid-area: text;
        background: var(--dark-2);
        padding: 0.5rem 0.8rem;
    }
    button {
        opacity: 0;
        display: inline;
        margin-left: .4rem;
        transition: opacity .4s ease-in-out;
        &:nth-of-type(1) {
            grid-area: buttonone;
        }
    }
    &:hover {
        button {
            opacity: 1;
        }
    }
`;