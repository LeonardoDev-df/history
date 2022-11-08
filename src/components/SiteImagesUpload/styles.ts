import styled, { css } from 'styled-components'
import { rgba, darken } from 'polished'

import { Close } from '../../styles/Icons'

interface SiteImageProps {
    hasAdvancedOptions?: boolean
    isDragOver?: boolean
    isErrored?: boolean
    showErrors?: boolean
}

export const Container = styled.div<SiteImageProps>`
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

    padding: 4rem 2.4rem;

    ${props => props.hasAdvancedOptions && css`
        outline: 2px dashed ${props => rgba(props.theme.colors.text, 0.5)};
        outline-offset: -8px;
    `}

    ${props => props.isErrored && css`
        border-color: ${props.theme.colors.red};
    `}
`
export const InputContainer = styled.div<SiteImageProps>`
    width: 16rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => rgba(props.theme.colors.paper, 0.5)};
    /* border: 2px solid ${props => rgba(props.theme.colors.paper, 0.5)}; */
    border-radius: 4px;
    transition: 0.1s;

    padding: 1.6rem .8rem;
    position: relative;

    ${props => props.isErrored && props.showErrors && css`
        border: 2px solid ${props.theme.colors.red};
    `}

    ${props => props.isDragOver && css`
        background: ${rgba(darken(0.15, props.theme.colors.paper_element), 0.5)};
    `}


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

    :hover {
        background: ${props => rgba(darken(0.15, props.theme.colors.paper_element), 0.5)};
    }

    > label {
        font-family: 'Montserrat', sans-serif;
        font-size: 2rem;
        font-weight: 600;

        cursor: pointer;
        transition: 0.1s;
        text-align: center;

        width: 100%;
        height: 100%;

        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;

        :hover {
            strong {
                color: ${props => props.theme.colors.primary};
            }
        }
        span {
            display: none;

            font-size: 1.6rem;
            /* font-weight: 500; */
            /* cursor: default; */
        }
    }
`

export const InputGroupContainer = styled.div`
    /* width: 100%; */

    /* display: grid;
    grid-template-columns: repeat(2, minmax(160px, 1fr));
    grid-gap: .8rem; */
    position: relative;

    display: flex;
    + div {
        margin-top: 1.6rem;
    }

    > div  {
        > strong {
            display: block;
            margin-bottom: .2rem;
        }

        + div {
            margin-left: 1.6rem;
        }
    }
`

export const PlusButton = styled.button`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => rgba(props.theme.colors.paper, 0.5)};
    border-radius: 4px;
    transition: 0.1s;

    padding: 1.6rem;
    margin-top: 2.4rem;

    :hover {
        background: ${props => rgba(darken(0.15, props.theme.colors.paper_element), 0.5)};
    }
`

export const InputCloseButton = styled.button`
    position: absolute;
    right: -3.2rem;
    top: 50%;
    /* margin-top: -50%; */

    transition: 0.2s;

    :hover {
        opacity: 0.5;
    }
`

export const StClose = styled(Close)`
    width: 2rem;
    height: 2rem;
`


