import styled, { css } from 'styled-components'
import ReactInputMask from 'react-input-mask';
import { darken } from 'polished'

import { AlertTriangle, Check } from '../../styles/Icons'

import { Tooltip } from '../../components/Tooltip'

interface ContainerProps {
    isErrored: boolean
    isFilled: boolean
    isFocused: boolean
    themeType?: 'light' | 'dark'
}

export const Container = styled.div <ContainerProps>`
    width: 100%;
    height: 4.8rem;

    background: ${props => props.theme.colors.input};
    border: 2px solid ${props => props.theme.colors.input};
    border-radius: 8px;

    display: flex;
    align-items: center;

    padding: 0 1.6rem;

    & > input {
        width: 100%;
        padding: 1rem .2rem;


        color: ${props => props.theme.colors.title};
        font-family: 'Roboto', sans-serif;
        font-size: 1.4rem;
        font-weight: 600;

        background: none !important;

        :focus {
            outline: 0;
        }
    }

    /* ${(props) => props.themeType === 'light' && css`
        background: #ececec;
        border-color: #ececec;

        & > input {
            color: var(--title);
        }
    `} */

    ${(props) => props.isFocused && css`
            border-color: #F79D14;
    `}

    ${(props) => props.isErrored && css`
            border-color: ${props => props.theme.colors.red};
    `}

`

export const Error = styled(Tooltip)`
    margin-left: 1.6rem;

    span {
        background: ${props => props.theme.colors.red};


        &::before {
            border-color: ${props => props.theme.colors.red} transparent;
        }
    }
`

export const CheckIcon = styled(Check) <ContainerProps>`
    width: 2rem;
    height: 2rem;

    color: ${props => props.theme.colors.green};

    opacity: 0;
    transition: 0.1s;

    ${(props) => props.isFilled && !props.isErrored && css`
        opacity: 1;
    `}
`

export const AlertIcon = styled(AlertTriangle)`
    width: 2rem;
    height: 2rem;

    color: ${props => props.theme.colors.red};
`
