import styled, { css } from 'styled-components'
import AssetLogo from '../../../assets/logos/logo-extended.svg';

interface NavProps {
    showSidebar: boolean
}


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
