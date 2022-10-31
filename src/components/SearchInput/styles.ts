import styled, { css } from 'styled-components'
import { darken, shade } from 'polished'

import {
    Search,
    Close
} from '../../styles/Icons'

type ControlProps = {
    isFilled: boolean
}


export const Container = styled.div`
    width: 100%;
    height: 5rem;

    background: var(--white);
    border-radius: 1rem;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.05);
    padding: 0 1.6rem;
`

export const ToolsContainer = styled.div<ControlProps>`
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;

    input {
        width: 100%;
        height: 100%;
        color: var(--title);

        :focus {
            border: 0 none;
            outline: 0;
        }

        ::placeholder {
            color: var(--placeholder);
        }
    }
`
const IconCss = css`
    width: 2.4rem;
    height: 2.4rem;
`

export const StSearch = styled(Search)`
    ${IconCss}

    margin-left: 1rem;
`
export const StClose = styled(Close)`
    ${IconCss}

    margin-left: 1rem;
`
