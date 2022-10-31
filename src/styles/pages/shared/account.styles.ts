import { Email, Lock, LockAlt } from '../../Icons'
import styled, { css } from 'styled-components'

const AlertColors = {
    danger: css`
        background: #fddede;
        color: #c53030;
        border: 1.5px solid #c53030;
    `,
    success: css`
        background: #d1ffdc;
        color: #07ba31;
        border: 1.5px solid #07ba31;
    `,
    warning: css`
        background: #fff5c4;
        color: #c79403;
        border: 1.5px solid #ffd300;
    `
}

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    position: relative;
    background: ${props => props.theme.colors.background};
`

export const Card = styled.div`
    width: min(1224px, 80%);
    /* height: 50%; */
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    border-radius: 1.6rem;
    margin-top: 7.2rem;

    padding: 1.6rem 2.4rem;

    h1 {
        color: ${props => props.theme.colors.title};
        /* margin-bottom: 1rem; */
    }

    label {
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        /* font-size: 1.25rem; */
        display: block;
        margin-bottom: .4rem;
    }
`

export const Alert = styled.div<{ color: "danger" | "success" | "warning" }>`
    ${props => AlertColors[props.color]}

    margin: 1.6rem 0 1rem;
    padding: 1.6rem;
    border-radius: 1.6rem;

    transition: 0.2s;
    animation: in 0.4s;

    @keyframes in {
        from {
            opacity: 0;
            transform: translateX(-25%);
        } to {
            opacity: 1;
            transform: translateX(0%);
        }
    }
`

const InputIconCss = css`
    width: 2rem;
    height: 2rem;

    margin-right: 1.6rem;
`

export const StEmail = styled(Email)`
    ${InputIconCss}
`
export const StPassword = styled(Lock)`
    ${InputIconCss}
`
export const StPasswordAlt = styled(LockAlt)`
    ${InputIconCss}
`
