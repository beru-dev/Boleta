import React from "react";
import styled from "styled-components";

interface InactiveFieldProps {
    fieldValue: string | number
    activate: () => void
}

const InactiveField: React.FC<InactiveFieldProps> = ({ fieldValue, activate }) => {
    return (
        <InactiveFieldStyled>
            <div>{fieldValue}</div>
            <button onClick={activate}>Edit</button>
        </InactiveFieldStyled>
    )
}

export default InactiveField;

const InactiveFieldStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    button {
        display: none;
    }
    &:hover {
        button {
            display: block;
        }
    }
`;