import styled, { css } from 'styled-components'
import { animated } from '@react-spring/web'

import { AlertTriangle, Close, CheckCircle, Info } from '../../../styles/Icons'

interface ToastProps {
    type?: "success" | "error" | "info"
    $hasDescription: boolean
}

// const toastTypeVariation = {
//     info: css`
//         background: #ebf8ff;
//         color: #3172b7;
//     `,
//     success: css`
//         background: #e6fffa;
//         color: #2e656a;
//     `,
//     error: css`
//         background: #fddede;
//         color: #c53030;
//     `
// }

const toastTypeVariation = {
    info: css`
        background: #2B8CEB;

        span {
            background: #ebf8ff;
        }
    `,
    success: css`
        background: #07ba31;

        span {
            background: #d1ffdc;
        }
    `,
    error: css`
        background: #c53030;

        span {
            background: #fddede;
        }
    `
}

export const Container = styled(animated.div) <ToastProps>`
    /* width: min(364px, 100%); */
    width: 100%;
    /* margin: 3rem 3rem 0 0; */

    position: relative;
    padding: 1.6rem 3rem 1.6rem 1.6rem;
    border-radius: 1rem;
    /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.25); */

    display: flex;

    background: #3172b7;
    color: white;
    overflow: hidden;

    & + div {
        margin-top: .8rem;
    }

    ${props => toastTypeVariation[props.type || "info"]}

    > svg {
        margin: .4rem 1.2rem 0 0;
    }

    div {
        flex: 1;

        strong {
            font-size: 1.6rem;
        }

        p {
            margin-top: .4rem;
            font-size: 1.4rem;
            opacity: 0.8;
            line-height: 2rem;
        }
    }

    button {
        position: absolute;
        right: 1.6rem;
        top: 1.6rem;
        opacity: 0.6;
        color: inherit;
    }

    ${props => !props.$hasDescription && css`
        align-items: center;

        svg {
            margin-top: 0;
        }
    `}
`
export const Loadbar = styled.span`
    background: inherit;
    width: 100%;
    height: .6rem;

    transition: 0.1s;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;

    /* border-radius: 0 0 1rem 1rem; */
    /* overflow: hidden; */
`

const IconCss = css`
    width: 2rem;
    height: 2rem;

    /* color: ${props => props.theme.colors.red}; */
    color: inherit;
`

export const AlertIcon = styled(AlertTriangle)`
    ${IconCss}
`
export const CheckIcon = styled(CheckCircle)`
    ${IconCss}
`
export const InfoIcon = styled(Info)`
    ${IconCss}
`

export const XCircle = styled(Close)`
    width: 2rem;
    height: 2rem;

    color: rgba(46, 46, 46, 0.6);
    transition: 0.2s;

    :hover {
        color: white;
    }
`
