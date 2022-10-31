import styled, { css } from 'styled-components'

type ContainerProps = {
    isErrored: boolean
    isFocused: boolean
}

export const Container = styled.div<ContainerProps>`
    width: 100%;

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
