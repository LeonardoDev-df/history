import styled, { css } from 'styled-components'
import Image from 'next/image'

import { LocationOn } from '../../styles/Icons'


const backgroundVariations = {
    red: css`
        background: ${props => props.theme.colors.red};
    `,
    green: css`
        background: ${props => props.theme.colors.green};
    `,
    blue: css`
        background: ${props => props.theme.colors.blue};
    `,
}

export const Container = styled.div`
    background: ${props => props.theme.colors.paper};
    border-radius: 16px;
    box-shadow: 0px 0px 4px 3px rgba(0,0,0, 0.05);

    /* width: fit-content;
    margin: auto; */

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;

    transition: 0.2s;
    cursor: pointer;

    :hover {
        transform: scale(1.025, 1.025);
        z-index: 8;
    }
`
export const StImage = styled(Image)`
    object-fit: cover;
    /* border-radius: 16px 16px 0 0; */
`
export const ImageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 50%;
`

export const CardContent = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.6rem;

    text-align: center;

    & > div + div {
        margin: 1.6rem 0;
    }
`

export const StatusFlag = styled.div<{
    colorType: "red" | "green" | "blue"
}>`
    /* ${props => backgroundVariations[props.colorType]} */
    background: ${props => props.theme.colors[props.colorType]};
    border-radius: 8px;
    color: white;
    font-weight: bold;

    padding: 1rem 0;
    width: 10rem;
    display: flex;
    justify-content: center;
`

export const StLocationOn = styled(LocationOn)`
    width: 2rem;
    height: 2rem;
    color: inherit;
`
