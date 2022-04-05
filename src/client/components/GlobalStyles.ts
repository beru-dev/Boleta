import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --dark-0: #171717;
        --dark-1: #232323;
        --dark-2: #333333;
        --dark-3: #454545;
        --light-0: #ffffff;
        --light-1: #e5e5e5;
        --light-2: #b5b5b5;
        --accent-1: #224488;
        --accent-2: #336699;
    }

    body {
        background: var(--dark-0);
        color: var(--light-1);
        font-family: arial, sans-serif;
        margin: 0;
    }

    #root {
        display: grid;
        grid-template:
            "header"
            "nav"
            "main"
            "footer"
    }

    @media (min-width: 769px) {
        #root {
            display: grid;
            grid-template:
                "header nav"
                "main main"
                "footer footer" / 1fr 4fr
        }
    }

    main {
        grid-area: main;
        background: var(--dark-0);
        > section {
            padding: 0.5rem;
            @media (min-width: 769px) {
                padding: .5rem 20rem;
            }
        }
    }
`;