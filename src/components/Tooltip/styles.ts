import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
    font-family: 'Roboto', sans-serif;

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        /* width: 160px; */
        background: #F79D14;
        color: white;
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        opacity: 0;
        transition: 0.2s;
        visibility: hidden;


        position: absolute;
        bottom: calc(100% + 10px);
        left: 50%;
        transform: translateX(-50%);

        /* Interessante */
        width: max-content;
        text-align: center;


        &::before {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-style: solid;
            border-color: #F79D14 transparent;
            border-width: 6px 6px 0 6px;
        }

        @media screen and (max-width: 516px) {
            display: none;
        }
    }


    &:hover span {
        opacity: 1;
        visibility: visible;
    }
`
