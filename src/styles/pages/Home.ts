import styled, { css } from 'styled-components';
import { shade } from 'polished';

import {
    ArrowRight,
    Facebook,
    Instagram,
    KeyboardArrowRight
} from '../Icons';

import AssetSpaceGirl from '../../assets/illustrations/space-girl.svg';
import AssetLayingMan from '../../assets/illustrations/laying-man.svg';
import AssetQuiz from '../../assets/quiz.svg';
import AssetGame from '../../assets/game.svg';
import Quizhistory from '../../assets/illustrations/quizan.svg';
import AssetImageReality from '../../assets/illustrations/image-reality.svg';
import AssetManUploading from '../../assets/illustrations/man-uploading.svg';
import AssetSocialMedias from '../../assets/illustrations/social-medias.svg';
import AssetScroll from '../../assets/illustrations/scroll.svg';
import AssetLogo from '../../assets/logos/logo-extended.svg';
import { Component } from 'react';

interface LogoSvgProps {
    color: string;
}

interface HeaderProps {
    $on: boolean;
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Logo = styled(Object(AssetLogo))`
    width: 180px;
    height: auto;
`;



// Navbar
export const Header = styled.header<HeaderProps>`
    background: rgba(45, 140, 235, 0.95);

    position: fixed;
    right: 0;
    left: 0;
    z-index: 99;

    & > div {
        width: min(1224px, 100%);
        margin: 0 auto;
        padding: 16px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        /* transition: 0.1s; */
    }

    ul {
        display: flex;
        align-items: center;
        list-style: none;

         li > a {
            color: white;
            font-size: 1.6rem;
            margin: 2.4rem;
            /* transition: all 250ms linear 0s; */
            &:hover {
                color: ${props => shade(0.1, props.theme.colors.white)};
            }
        }

        button {
            background: var(--white);
            padding: 0.8rem 1.6rem;
            margin-left: 1.6rem;
            border-radius: 6px;

            color: var(--primary);
            font-weight: 500;
            font-size: 1.6rem;

            transition: 0.2s;

            &:hover {
                background: ${props => shade(0.05, props.theme.colors.white)};
            }
        }
    }

    /* Menu toggle navbar */
    @media screen and (max-width: 540px) {
        & > div {
            & > button {
                div {
                    background: white;
                    height: 5px;
                    border-radius: 1px;
                    width: 100%;
                    margin: 6px auto;

                    transition: 0.3s;
                }

                width: 40px;
                height: 30px;
                /* margin-right: 20px; */
            }

            ${props => props.$on && css`
                /* fullscreen */
                position: absolute;
                top:0;
                left:0;

                width: 100vw;
                height: 100vh;

                background-color: #232323;

                z-index: 10;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                & > button {
                    position: absolute;
                    right: 24px;
                    top: 16px;
                }

                nav {
                    width: 72%;
                }

                ul {
                    text-align: center;
                    width: 100%;
                    display: block;

                    li {
                        width: 100%;
                    }

                    a {
                        transition: 0.5;
                        font-size: 2.4rem;
                        line-height: 4rem;
                        display: block;
                    }

                    button {
                        color: #232323;
                        margin-left: 0;
                        font-size: 2.4rem;
                        width: 100%;
                        padding: 1.6rem 0;
                    }
                }
            `}

            nav {
                display: ${props => props.$on ? "block" : "none"};
            }
        }
    }
`;

export const One = styled.div<HeaderProps>`
    ${props => props.$on && css`
        transform: rotate(45deg) translate(7px, 7px);
    `}
`;

export const Two = styled.div<HeaderProps>`
    ${props => props.$on && css`
        opacity: 0;
    `}
`;

export const Three = styled.div<HeaderProps>`
    ${props => props.$on && css`
        transform: rotate(-45deg) translate(8px, -9px);
    `}
`;
export const Four = styled.div<HeaderProps>`
    ${props => props.$on && css`
        transform: rotate(-45deg) translate(8px, -9px);
    `}
`;


export const Hero = styled.section`
    background: var(--primary);
    position: relative;

    padding: 3.2rem;

    & > div {
        width: min(1224px, 100%);
        margin: 64px auto 0;

        display: flex;

        & > div {
            max-width: 40%;
            margin-right: 8px;

            /* Será? */
            /* display: flex;

            flex-direction: column;
            justify-content: center; */
        }

        h1 {
            color: var(--white);
            font-size: 3.5rem;

            margin-bottom: 2.4rem;
        }

        p{
            color: #f5f5f5;
            font-size: 1.6rem;
        }

        button {
            background: var(--secondary);
            height: 5.6rem;
            width: min(164px,100%);
            justify-content: center;
            align-items: center;

            color: white;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 2rem;

            border-radius: 16px;
            padding: 0 .8rem;

            display: flex;
            margin-top: 3.2rem;
            margin-left: auto;
            margin-right: 1.6rem;


            transition: 0.2s;

            &:hover {
                background: ${props => shade(0.05, props.theme.colors.secondary)};
                box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.15);
            }
        }
    }

    @media screen and (max-width: 768px) {
        & > div {
            margin: 64px auto;
        }
    }

    @media screen and (max-width: 540px) {
        & > div {
            margin: 7.2rem auto 10rem;

            & > div {
                max-width: 100%;
            }
        }
    }
`;

export const ScrollIndicator = styled(Object(AssetScroll))`
    position: absolute;
    left: 50%;
    bottom: 0;

    width: 20px;
    height: auto;

    animation: move 1s infinite alternate;

    @keyframes move {
        from {
            transform: translateY(-8px);
        } to {
            transform: translateY(20px);
        }
    }

    @media screen and (max-width: 540px) {
        width: 16px;

        bottom: 0;
    }

    @media screen and (min-width: 2560px) {
        bottom: -124px;
    }
`;


export const SpaceGirl = styled(Object(AssetSpaceGirl))`
    max-width: 100%;
    height: auto;

    @media screen and (max-width: 540px) {
        display: none;
    }
`;

export const ButtonEndIcon = styled(ArrowRight)`
    width: 24px;
    height: 24px;

    fill: white;

    margin-left: 1rem;
`;

export const Main = styled.div`
    width: min(1224px, 100%);
    margin: 4.8rem auto;

    padding: 0 3.2rem;

    color: var(--text);

    & > div {
        display: flex;
        flex-direction: column;
        margin: 6.4rem 0;
    }

    h2 {
        position: relative;
        display: inline-block;
        margin-bottom: 4rem;

        color: var(--title);

        & > span {
            color: var(--secondary);
        }

        &:after {
            position: absolute;
            content: "";
            bottom: 0;
            background: var(--title);
            height: 0.2rem;
            width: 6.4rem;
            right: 50%;
            transform: translateX(50%);
        }
    }

    @media screen and (max-width: 540px) {
        h2 {
            font-size: 2.4rem;
            text-align: center;
        }
    }
`;


export const SectionOne = styled.div`
    h2 {
        margin-right: auto;
    }

    & > div {
        display: flex;

        padding: 0 3.2rem;

        p {
            width: 60%;
        }
    }

    @media screen and (max-width: 540px) {
        & > div {
            p {
                width: 100%;
            }
        }
    }
`;

export const LayingMan = styled(Object(AssetLayingMan))`
    width: 80%;
    height: auto;

    @media screen and (max-width: 540px) {
        display: none;
    }
`;


export const Quizback = styled(Object(AssetQuiz))`
    background: 100%;
    width:100%;
    height: auto;

    @media screen and (max-width: 540px) {
        display: none;
    }
`;

export const QuizGaming = styled(Object(AssetGame))`
    background: 100%;
    width:100%;
    height: 100%;

    @media screen and (max-width: 540px) {
        display: none;
    }
`;

export const Quizhist = styled(Object(Quizhistory))`
    width: 40%;
    height: auto;

    @media screen and (max-width: 540px) {
        display: none;
    }
`;


export const SectionTwo = styled.div`
    h2 {
        margin-left: auto;

        & > span {
            color: var(--primary) !important;
        }
    }

    & > div {
        text-align: center;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: auto;
        }

        p {
            width: 50%;
            margin-bottom: 4rem;
        }
    }

    @media screen and (max-width: 540px) {
        & > div {
            p {
                width: 100%;
            }
        }
    }
`;

export const SectionThree = styled.div`
    h2 {
        margin: 0 auto;
    }

    & > div {
        margin: 7.2rem 0 4.8rem;

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-gap: 4rem;

        position: relative;

        &:before {
            content: "";
            z-index: -1;

            position: absolute;
            top: 64%;
            /* transform: translateY(-50%); */

            left: 50%;
            transform: translateX(-50%);

            width: 70%;
            height: 1px;
            background: var(--placeholder);
        }

        section {
            display: flex;
            flex-direction: column;
            /* justify-content: center; */
            align-items: center;

            text-align: center;

            span {
                display: flex;
                justify-content: center;
                align-items: center;

                background: var(--primary);
                border-radius: 50%;

                width: 40px;
                height: 40px;

                margin: 2.4rem 0;

                color: white;
                font-weight: 600;
            }

            h3 {
                margin-bottom: 1.6rem;
            }
        }
    }

    @media screen and (max-width: 768px) {
        & > div {
            grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));

            &:before {
                top: 61%;
            }
        }
    }

    @media screen and (max-width: 710px) {
        & > div {
            &:before {
                top: 58%;
            }
        }
    }

    @media screen and (max-width: 540px) {
        & > div {
            grid-template-columns: 1fr;

            &:before {
                display: none;
            }
        }
    }
`;

export const SectionFour = styled.div`
h2 {
    margin-right: auto;
}

h3 {
    margin-right: auto;
    font-size: 24px;
    & > span {
        color: var(--primary) !important;
    }
}

p {
    font-size: 24px;
}

& > div {
    display: flex;

    padding: 0 3.2rem;

    p {
        width: 60%;
    }
}

@media screen and (max-width: 540px) {
    & > div {
        p {
            width: 100%;
        }
    }
}




    @media screen and (max-width: 768px) {
        & > div {
            grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));

            &:before {
                top: 61%;
            }
        }
    }

    @media screen and (max-width: 710px) {
        & > div {
            &:before {
                top: 58%;
            }
        }
    }

    @media screen and (max-width: 540px) {
        & > div {
            grid-template-columns: 1fr;

            &:before {
                display: none;
            }
        }
    }
`;

const imagesCss = css`
    height: 188px;
    width: auto;

    @media screen and (max-width: 768px) {
        height: 132px;
    }
`;

export const ImageReality = styled(Object(AssetImageReality))`
    ${imagesCss}
`;
export const ManUploading = styled(Object(AssetManUploading))`
    ${imagesCss}
`;
export const SocialMedias = styled(Object(AssetSocialMedias))`
    ${imagesCss}
`;




// Footer part
export const Footer = styled.footer`
    background: #232323;
    padding: 0 3.2rem;

    color: var(--gray_light);

    & > section {
        padding: 4rem 0;

        width: min(1224px, 100%);
        margin: 0 auto;

        /* display: flex;
        align-items: center; */
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

        justify-items: start;
        grid-gap: 24px;


        div {
            grid-column: 1 / 3;

            p {
                margin: 2.4rem 0;
            }
        }

        li {
            align-items: center;
            margin-top: 1.6rem;

            a {
                color: var(--gray_light);
            }
        }
    }

    /* Parte final */
    & > div {
        height: 6.4rem;

        border-top: 1px solid var(--text);

        display: flex;
        align-items: center;

        p {
            width: min(1224px, 100%);
            margin: 0 auto;

            span {
                color: var(--secondary);
            }
        }
    }

    @media screen and (max-width: 540px) {
        & > section {
            div {
                grid-column: auto;
            }
        }

        & > div {
            padding: 2.4rem 0;
        }
    }
`;


export const LogoFooter = styled(Object(AssetLogo))`
    width: 50%;
    height: auto;

    g {
        fill: var(--gray_light);
    }
`;

const IconFooterCss = css`
    width: 32px;
    height: 32px;

    fill: var(--gray_light);

    &:hover {
        fill: ${props => shade(0.2, props.theme.colors.gray_light)};
    }
`;

export const FacebookIcon = styled(Facebook)`
    ${IconFooterCss}

    margin-right: 1rem;
`;
export const InstagramIcon = styled(Instagram)`
    ${IconFooterCss}
`;

export const ArrowRightIcon = styled(KeyboardArrowRight)`
    width: 24px;
    height: 24px;

    fill: var(--title);

    margin: 0 1rem;
`;
