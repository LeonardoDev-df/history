import { shade } from 'polished'

import styled, { css } from 'styled-components';

interface ContainerProps {
    color?: string;
    tintColor?: string;
}

export const Container = styled.button<ContainerProps>`
    /* padding: 1.6rem; */
    padding: 0 1rem;

    width: 100%;
    transition: 0.2s;

    background: ${props => props.theme.colors.secondary};
    border-radius: 1rem;
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.05);

    height: 5.6rem;
    /* height: fit-content; */

    display: flex;
    justify-content: center;
    align-items: center;

    ${props => props.color && css`
        background: ${props.color};
    `}

    color: white;
    font-size: 2.2rem;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;

    ${props => props.tintColor && css`
        color: ${props.tintColor};
    `}

    :disabled {
        cursor: not-allowed;
    }

    /* Colocar hover somente nos que estiver ativo */
    :not(:disabled):hover {
        background: ${props => props.color ? shade(0.05, props.color) : shade(0.05, props.theme.colors.secondary)}
    }

    :not(:disabled):active {
        transform: scale(0.95,0.95);
    }
`;
