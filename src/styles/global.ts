import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        /* a cada 1rem será considera 10px */
        font-size: 62.5%;
    }

    html,
    body,
    #root {
        max-width: 100vw;
        max-height: 100vh;

        height: 100%;
        width: 100%;

        font-family: 'Roboto', sans-serif;
        text-rendering: optimizelegibility;
        -webkit-font-smoothing: antialiased;
        scroll-behavior: smooth;
    }

    body,
    input,
    textarea,
    button {
        color: ${props => props.theme.colors.text};
        font: 400 1.6rem 'Roboto', sans-serif;
    }

    body {
        > div {
            width: 100%;
            height: 100%;
        }
    }

    p {
        line-height: 150%;
        font-size: 1.6rem;
    }

    *,
    button,
    input {
        border: 0;
        background: none;
    }

    a,
    button {
        cursor: pointer;
        font-family: 'Roboto', sans-serif;
    }

    h1,
    h2 {
        font-family: 'Montserrat', sans-serif;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    :root {
        --primary: #2D8CEB;
        --secondary: #EBA42D;

        --text: #2E2E2E;
        --background: #f5f5f5;
        --white: #ffffff;
        --black: #000000;
        --gray_light: #DCDCDC;
        --placeholder: #BEBEBE;
        --title: #3B3B3B;
        --blue_light: #DCEEFF;
    }

    @media screen and (max-width: 768px) {
        html {
            font-size: 50%;
        }
    }

    @mixin button-push-animation {
        transform: scale(0.9, 0.9);
    }
`;
