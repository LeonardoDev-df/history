import styled, { css } from 'styled-components'

import {
    Search
} from '../../styles/Icons'

interface SearchProps {
    isEmpty: boolean
}

export const Container = styled.div<SearchProps>`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    height: 0;

    width: min(40.8rem, 100%);
    /* padding: 1.6rem 1.2rem; */

    transition: 0.3s;

    ${props => !props.isEmpty && css`
        background: #fdfdfd;
        height: 100%;

        /* ${SearchInputWrapper} {
            background: var(--primary);
        } */
    `}
`

export const SearchInputWrapper = styled.div`
    padding: .8rem .8rem 1.6rem;
`

export const SearchResWrapper = styled.div`
    padding: .8rem 1rem;

    > h3 {
        color: var(--title);
        margin-bottom: 1rem;
        /* margin-left: .8rem; */
    }
`

export const SectionDivider = styled.div`
    width: 100%;
    height: 12px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: var(--background);
`
export const ResClose = styled.button`
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);

    padding: .8rem 1.6rem;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
    border-radius: 2.4rem;

    color: var(--title);
`
