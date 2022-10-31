import styled, { css } from 'styled-components'

type CharBackProps = {
    colBg?: string
    colMd?: string
    colSm?: string
}

export const Container = styled.div``
export const Grid = styled.div<{ autoFit?: boolean }>`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 2rem;
    width: min(1124px, 100%);

    margin: 2.4rem auto 0;

    ${props => props.autoFit && css`
        grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
    `}

    + div {
        margin-top: 5.6rem;
    }

    @media screen and (max-width: 673px) {
        grid-gap: 3.2rem;
    }
`

export const ChartBack = styled.div<CharBackProps>`
    background: ${props => props.theme.colors.paper};
    border-radius: 6px;
    box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.1);

    width: 100%;
    /* height: 100%; */
    position: relative;

    padding: 0 1.6rem;
    /* margin: auto; */

    ${props => props.colBg && css`
        grid-column: ${props.colBg};
    `}

    @media screen and (max-width: 1165px) {
        ${props => props.colMd && css`
            grid-column: ${props.colMd};
        `}
    }
    @media screen and (max-width: 673px) {
        ${props => props.colSm && css`
            grid-column: ${props.colSm};
        `}
    }
`
