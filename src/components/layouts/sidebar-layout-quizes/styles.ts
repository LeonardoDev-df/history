import styled, { css } from 'styled-components'
import AssetLogo from '../../../assets/logos/logo-extended.svg';

interface NavProps {
    showSidebar: boolean
}

interface HeaderProps {
    $on: boolean;
}
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


export const Container = styled.div`
    width: 100%;
    height: 100%;
`
export const Navbar = styled.div<NavProps>`
    background: ${props => props.theme.colors.navbar};
    width: 100%;
    padding: 1.6rem 2.4rem;
    position: fixed;
    z-index: 11;

    @media screen and (max-width: 940px) {
        & > button {
            div {
                background: white;
                height: 2.4px;
                border-radius: 1px;
                width: 100%;
                margin: 6px auto;

                transition: 0.3s;
            }

            width: 30px;
            height: 20px;
            margin-right: 2.4rem;
        }
    }


`

export const One = styled.div<NavProps>`
    ${props => props.showSidebar && css`
        transform: rotate(45deg) translate(3px, 4px);
    `}
`;

export const Two = styled.div<NavProps>`
    ${props => props.showSidebar && css`
        opacity: 0;
    `}
`;

export const Three = styled.div<NavProps>`
    ${props => props.showSidebar && css`
        transform: rotate(-45deg) translate(8px, -9px);
    `}
`;

export const FixedContent = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    height: 100%;
    z-index: 9;
`

export const Main = styled.div<NavProps>`
    height: 100%;
    padding: 67px 0 0 264px;
    transition: 0.2s;

    /* ${props => !props.showSidebar && css`
        padding: 67px 0 0 0;
    `} */

    @media screen and (max-width: 940px) {
        padding: 67px 0 0 0;
    }

    @media screen and (max-width: 768px) {
        padding: 60px 0 0 0;
    }
`

export const Logo = styled(Object(AssetLogo))`
    width: 180px;
    height: auto;
`;
