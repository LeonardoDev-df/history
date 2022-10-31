import styled, { css } from 'styled-components'
import { rgba } from 'polished'

type LoaderProps = {
    show: boolean
    type: "overlay" | "no-overlay"
}

export const Container = styled.span<LoaderProps>`
    opacity: 0;
    visibility: hidden;
    display: none;

    transition: 0.2s;
    z-index: 99;
    padding-top: 1.6rem;

    ${props => props.show && css`
        opacity: 1;
        visibility: visible;
        display: flex;
    `}

    ${props => props.type === "overlay" && css`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        /* background: rgba(255, 255, 255, 0.8); */
        background: ${({ theme: { colors } }) => rgba(colors.background, 0.8)};

        width: 100%;
        height: 100%;
        border-radius: 0 1.6rem 1.6rem 0;

        /* display: flex; */
        justify-content: center;
        align-items: center;

        cursor: wait;
    `}
`

export const StLoader = styled.span`
    width: 50px;
    height: 50px;
    display: grid;
    border:4px solid #0000;
    border-radius: 50%;
    border-color:#ccc #0000;
    animation: s6 1s infinite linear;

    ::before,
    ::after {
        content:"";
        grid-area: 1/1;
        margin:2px;
        border:inherit;
        border-radius: 50%;
    }

    ::before {
        /* border-color:#f03355 #0000; */
        border-color: ${props => props.theme.colors.primary} #0000;
        animation:inherit;
        animation-duration: .5s;
        animation-direction: reverse;
    }

    ::after {
        margin:8px;
    }

    @keyframes s6 {
        100%{transform: rotate(1turn)}
    }
`

export const StSpinnerLoader = styled.span`
    width:50px;
    height:50px;
    border-radius:50%;
    padding:1px;
    background: conic-gradient(#0000 10%, #2D8CEB) content-box;
    margin: auto;

    mask:
        repeating-conic-gradient(#0000 0deg,#000 1deg 20deg,#0000 21deg 36deg),
        radial-gradient(farthest-side,#0000 calc(100% - 9px),#000 calc(100% - 8px));
    -webkit-mask-composite: destination-in;

    mask-composite: intersect;
    animation:s4 1s infinite steps(10);

    @keyframes s4 {
        to{
            transform: rotate(1turn);
        }
    }
`

export const StSpinnerLoaderTwo = styled.span`
    width:50px;
    height:50px;
    border-radius:50%;
    background: conic-gradient(#0000 10%, #2D8CEB);
    margin: auto;

    mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
    animation: s3 1s infinite linear;

    @keyframes s3 {
        to{
            transform: rotate(1turn);
        }
    }
`
