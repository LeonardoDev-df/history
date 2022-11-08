import styled, { css } from 'styled-components'
import { rgba, shade } from 'polished'

import AssetLogo from '../../assets/logos/logo-extended.svg';
import { Upload, BadgeVrFill, LogOut, User, Admin, Users, Dashboard } from '../../styles/Icons'

interface SidebarProps {
    showSidebar: boolean
}

export const Container = styled.div<SidebarProps>`
    width: 264px;
    height: 100%;

    overflow-x: hidden;

    background: ${props => props.theme.colors.sidebar};
    padding: calc(67px + 20px) 1.6rem 3.2rem;

    box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: 0.2s;

    @media screen and (max-width: 940px) {
        position: absolute;
        top: 0;
        left: 0;

        ${props => !props.showSidebar && css`
            transform: translateX(-100%);
        `}
    }

    @media screen and (max-width: 768px) {
        width: 208px;
    }
`

export const Item = styled.div<{ active?: boolean }>`
    color: ${props => props.theme.colors.title};

    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    padding: 1rem;

    + div {
        margin-top: 1rem;
    }


    span {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 1.4rem;
    }

    :hover {
        background: ${props => shade(0.1, props.theme.colors.sidebar)};
    }

    ${({ theme, active }) => active && css`
        background: ${theme.colors.item_active_back};
        color: ${theme.colors.item_active_text};

        :hover {
            background: ${props => props.theme.colors.item_active_back} !important;
        }
    `}
`

export const Divider = styled.span`
    display: block;
    width: 100%;
    height: 1px;

    background: ${props => rgba(props.theme.colors.gray_light, 0.8)};
    opacity: 0.8;
    margin: 1.6rem 0;
`


export const Logo = styled(Object(AssetLogo))`
    width: 180px;
    height: auto;
`;

const IconCss = css`
    width: 2.4rem;
    height: 2.4rem;
    color: inherit;

    margin-right: 1.6rem;
`
export const StUser = styled(User)`
    ${IconCss}
`
export const StUpload = styled(Upload)`
    ${IconCss}
`
export const StVr = styled(BadgeVrFill)`
    ${IconCss}
`
export const StLogOut = styled(LogOut)`
    ${IconCss}
`
export const StAdmin = styled(Admin)`
    ${IconCss}
`
export const StUsers = styled(Users)`
    ${IconCss}
`
export const StDashboard = styled(Dashboard)`
    ${IconCss}
`


