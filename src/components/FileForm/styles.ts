import styled, { css } from 'styled-components'
import { rgba, darken } from 'polished'

interface FileFormProps {
    hasAdvancedOptions: boolean
    isDragOver: boolean
    isErrored: boolean
}

export const Container = styled.div<FileFormProps>`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.colors.paper_element};
    border: 2px solid ${props => props.theme.colors.paper_element};
    border-radius: 4px;
    transition: 0.1s;
    margin-bottom: 1.6rem;

    ${props => props.hasAdvancedOptions && css`
        outline: 2px dashed ${props => rgba(props.theme.colors.text, 0.5)};
        outline-offset: -8px;
    `}
    ${props => props.isErrored && css`
        border-color: ${props.theme.colors.red};
    `}

    ${props => props.isDragOver && css`
        background: ${darken(0.15, props.theme.colors.paper_element)};
    `}

    padding: 4rem 2.4rem;

    /* hide input[type = "file"] */
    /* Setting the property values to zero ends up throwing the element out of tab party in some browsers.
        And position: absolute guarantees the element does not interfere with the sibling elements. */
    input[type = "file"] {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    > label {
        font-family: 'Montserrat', sans-serif;
        font-size: 2rem;
        font-weight: 600;
        cursor: pointer;
        transition: 0.1s;
        text-align: center;

        :hover {
            strong {
                color: ${props => props.theme.colors.primary};
            }
        }
        span {
            display: none;
            margin-top: 1.6rem;

            font-size: 1.6rem;
            /* font-weight: 500; */
            cursor: default;
        }
    }
`
