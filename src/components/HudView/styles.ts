import styled, { css } from 'styled-components'
import {
    Heart,
    HeartOutline,
    Share,
    Info,
    ArrowIosDownwardOutline,
    ArrowIosUpwardOutline
} from '../../styles/Icons'

interface BottomHUD {
    bottomVisible: boolean
}

const HudCss = css`
    position: fixed;


    z-index: 10;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.6rem;

    color: var(--white);
`

export const Container = styled.div`
    height: 100%;

    button {
        color: white;
    }

    user-select: none;
`

export const HeaderHUD = styled.div`
    ${HudCss}
    top: 0;
    left: 0;
    right: 0;

    ::before {
        content: '';
        position: absolute;
        z-index: -1;

        top: -120%;
        width: 40%;
        height: 172px;
        border-radius: 50%;
        background: rgb(0, 0, 0, 0.25);
        filter: blur(24px);
    }
`
export const HeaderHUDText = styled.div`
    text-align: center;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`
export const HeaderHUDTools = styled.div`
    position: absolute;
    top: 0;
    right: 1.6rem;
    bottom: 0;


    display: flex;
    align-items: center;
    justify-content: space-between;



    button {
        transition: all 0.2s;
        filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.2));
    }

    > button + div {
        margin-left: 1.6rem;
    }
`

export const YearHUDContainer = styled.div`
    ${HudCss}
    top: 0;
    bottom: 0;
    left: 0;

    /* ::before {
        content: '';
        position: absolute;
        z-index: -1;

        left: -64%;
        height: 50%;
        width: 172px;
        border-radius: 50%;
        background: rgb(0, 0, 0, 0.5);
        filter: blur(24px);
    } */
`
export const YearHUD = styled.div`
    margin-left: 3.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 768px) {
        margin-left: 0;
    }
`
export const YearHUDOptContainer = styled.div`
    display: flex;
    flex-direction: column;
`
export const YearHUDOpt = styled.button<{ active: boolean }>`
    padding: .8rem 1.6rem;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 2px;

    transition: 0.2s;

    :hover {
        transform: scale(1.1, 1.1);
    }

    ${props => props.active && css`
        transform: scale(1.1, 1.1);
        background: var(--primary);
    `}
`

export const HeartLike = styled.div<{ isBottom: boolean }>`
    position: relative;
    width: fit-content;

    display: flex;
    align-items: center;

    ${props => props.isBottom && css`
        span {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);

            font-size: 12px;
            text-align: center;
        }
    `}
`

export const BottomHUDContainer = styled.div<BottomHUD>`
    ${HudCss}
    bottom: 0;
    left: 0;
    right: 0;
    transition: 0.2s;

    ${props => !props.bottomVisible && css`
        transform: translateY(100%);
    `}

    ::before {
        content: '';
        position: absolute;
        z-index: -1;

        bottom: -80%;
        width: 60%;
        height: 172px;
        border-radius: 50%;
        background: rgb(0, 0, 0, 0.25);
        filter: blur(24px);
    }

    @media screen and (max-width: 768px) {
        padding: 0 1.6rem;
    }
`

export const BottomHUDShowButton = styled.button`
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);

    transition: 0.2s;
`

export const BottomHUDInfoButton = styled.button<BottomHUD>`
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    right: 1.6rem;
    transition: 0.2s;


    filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2));

    ${props => !props.bottomVisible && css`
        top: -24%;
    `}

    @media screen and (max-width: 768px) {
        top: -24%;
    }
`
export const BottomHUDInfoButtonTooltip = styled.div<{ show: boolean, bottomVisible: boolean }>`
    position: absolute;
    bottom: 100%;
    right: 2.4rem;

    background: white;
    border-radius: 8px;
    width: min(40rem, 100%);
    text-align: start;
    color: var(--text);

    transition: 0.2s;

    button {
        color: var(--text);
    }

    padding: 1.2rem 1.6rem;

    h3 {
        color: var(--title);
    }

    div + div {
        margin-top: 1.6rem;
    }

    span {
        margin: auto 0;
    }

    ${props => !props.show && css`
        transform: translateX(108%);
    `}
    ${props => !props.bottomVisible && css`
        bottom: 150%;
    `}

    @media screen and (max-width: 768px) {
        bottom: 145%;
    }
`

export const BottomHUDImage = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 164px);
    grid-gap: 2rem;

    margin-bottom: 1.2rem;

    @media screen and (max-width: 768px) {
        overflow: auto;
        padding: .8rem;
    }
`
export const BottomHUDImageButton = styled.button<{ isActive: boolean }>`
    transition: 0.2s;

    img {
        width: 100%;
        height: 100%;
    }

    ${props => props.isActive && css`
        outline: 2px solid white;

        /* A partir de 768px */
        @media screen and (min-width: 768px) {
            transform: translateY(-15%);
        }
    `}
`


const IconCSS = css`
    width: 2.4rem;
    height: 2.4rem;

    color: inherit;
`
const IconYearCSS = css`
    width: 3.2rem;
    height: 3.2rem;

    color: white;
`

export const StShareIcon = styled(Share)`
    ${IconCSS}
`
export const StHeartOutIcon = styled(HeartOutline)`
    ${IconCSS}
`
export const StHeartIcon = styled(Heart)`
    ${IconCSS}
`
export const StArrowUpIcon = styled(ArrowIosUpwardOutline)`
    ${IconYearCSS}
`
export const StArrowDownIcon = styled(ArrowIosDownwardOutline)`
    ${IconYearCSS}
`
export const StInfoIcon = styled(Info)`
    width: 5.6rem;
    height: 5.6rem;

    color: white;
    /* background: black; */
`
