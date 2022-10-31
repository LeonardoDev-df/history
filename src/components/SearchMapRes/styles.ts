import styled, { css } from 'styled-components'

import {
    Search
} from '../../styles/Icons'


export const Container = styled.button`
    display: flex;

    width: 100%;
    height: 132px;
    border-radius: .8rem;
    /* box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.05); */
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: var(--white);


    + div {
        margin-top: 2.4rem;
    }
`

export const ImageWrapper = styled.div`
    width: 116px;
    height: 100%;
    border-radius: .8rem 0 0 .8rem;

    overflow: hidden;

    position: relative;

    img {
        margin-left: -50%;

        height: 132px;
    }
`
export const AsideData = styled.div`
    flex: 1;
    padding: 1.2rem;
    height: 100%;
    text-align: start;

    h3 {
        color: var(--primary);
    }

    small {
        color: var(--title);
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
