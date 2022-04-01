import styled from "styled-components";

export default styled.div`
    display: grid;
    grid-template-columns: 8rem 1fr;
    input, select, textarea {
        background: var(--dark-3);
        color: var(--light-1);
        border: 0;
    }
    textarea {
        display: block;
    }
`;