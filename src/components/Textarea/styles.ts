import styled, { css } from 'styled-components'
import { AlertTriangle } from '../../styles/Icons'
import { Tooltip } from '../Tooltip'

type ContainerProps = {
    isErrored: boolean
    isFocused: boolean
}

export const Container = styled.div<ContainerProps>`
    width: 100%;

    position: relative;

    background: ${props => props.theme.colors.input};
    border: 2px solid ${props => props.theme.colors.input};
    border-radius: 8px;

    /* font-weight: 600; */

    > textarea {
        width: 100%;
        height: 100%;
        resize: vertical;

        color: ${props => props.theme.colors.title};
        font-size: 1.4rem;
        padding: .4rem;

        :focus {
            outline: 0;
        }
    }

    ${props => props.isFocused && css`
        border-color: ${props.theme.colors.orange};
    `}
    ${props => props.isErrored && css`
        border-color: ${props.theme.colors.red};
    `}
`

export const Error = styled(Tooltip)`
    position: absolute;
    top: 1rem;
    right: 1.6rem;
    z-index: 2;

    /* margin-left: 1.6rem; */

    span {
        background: ${props => props.theme.colors.red};


        &::before {
            border-color: ${props => props.theme.colors.red} transparent;
        }
    }
`

export const AlertIcon = styled(AlertTriangle)`
    width: 2rem;
    height: 2rem;

    color: ${props => props.theme.colors.red};
`
