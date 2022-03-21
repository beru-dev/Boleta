import React from "react";
import styled from "styled-components";

const WaitingStyled = styled.svg`
    background: transparent;
`;

const Waiting: React.FC = () => {
    return (
        <WaitingStyled width="100" height="100" viewBox="0 0 100 100">
            <circle cx="25" cy="50" r="5" fill="gray">
                <animate attributeName="r" values="5;7;5;5" dur="2s" begin="0s" repeatCount="indefinite"/>
            </circle>
            <circle cx="50" cy="50" r="5" fill="gray">
                <animate attributeName="r" values="5;7;5;5" dur="2s" begin=".25s" repeatCount="indefinite"/>
            </circle>
            <circle cx="75" cy="50" r="5" fill="gray">
                <animate attributeName="r" values="5;7;5;5" dur="2s" begin=".5s" repeatCount="indefinite"/>
            </circle>
        </WaitingStyled>
    )
}

export default Waiting;