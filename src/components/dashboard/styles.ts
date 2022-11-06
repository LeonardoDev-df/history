import styled, { css } from 'styled-components'

import { Clock, House, Body } from '../../styles/Icons'

const ChartVariations = {
    blue: css`
        background: linear-gradient(60deg, rgba(89,166,243,1) 0%, rgba(45,140,235,1) 100%);
    `,
    orange: css`
        background: linear-gradient(60deg, #ffa726, #fb8c00);
    `,
    green: css`
        background: linear-gradient(60deg, #66bb6a, #43a047);
    `,
    red: css`
        background: linear-gradient(60deg, #ef5350, #e53935);
    `,
}

type ColorType = { colorType: keyof typeof ChartVariations }
type ColorTyper = { colorType?: keyof typeof ChartVariations }

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
`

export const BodyContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const ChartContainer = styled.div<ColorType>`
    width: 100%;
    height: fit-content;
    background: linear-gradient(60deg, rgba(89,166,243,1) 0%, rgba(45,140,235,1) 100%);
    border-radius: .6rem;
    box-shadow: 0 4px 16px 0px rgba(0,0,0,0.25);

    position: relative;
    bottom: 1.6rem;
    color: white;
    padding: 1.6rem;

    ${props => ChartVariations[props.colorType]}
`

export const Main = styled.div`
    padding: 0 0 .8rem;

    > h3 {
        font-weight: 500;
        color: ${props => props.theme.colors.title};
    }
`

export const Footer = styled.footer`
    /* width: 100%;
    height: 100%; */
    /* border-top: .8px solid ${props => props.theme.colors.input}; */

    padding: 1rem 0;

`

export const Divider = styled.div`
    width: 100%;
    height: .8px;
    background: ${props => props.theme.colors.input};

    margin-bottom: .8rem;
`

export const InfoMain = styled.div`
    padding: .8rem 0;

    > div {
        text-align: end;

        h2 {
            font-weight: 400;
            color: ${props => props.theme.colors.title};
        }

        p {
            /* font-size: 1.8rem; */
            font-weight: 400;
        }
    }

    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
    align-items: center;
`

export const IconContainer = styled.span<ColorType>`
    width: fit-content;
    height: fit-content;

    background: linear-gradient(60deg, rgba(89,166,243,1) 0%, rgba(45,140,235,1) 100%);
    box-shadow: 0 4px 16px 0px rgba(0,0,0,0.25);
    border-radius: .6rem;

    position: relative;
    bottom: 2.4rem;
    color: white;
    padding: 2.4rem;

    ${props => ChartVariations[props.colorType]}
`

const IconCss = css`
    width: 3.2rem;
    height: 3.2rem;
`

export const StBody = styled(Body)`
    ${IconCss}
`
export const StHouse = styled(House)`
    ${IconCss}
`

export const StClock = styled(Clock)`
    width: 1.6rem;
    height: 1.6rem;

    margin-right: .8rem;
`
