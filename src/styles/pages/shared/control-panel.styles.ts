import styled, { css } from 'styled-components'
import { rgba, darken, shade } from 'polished'
import { Form } from '@unform/web'

import { Button } from '../../../components/Button'
import {
    Email,
    User,
    UserAlt,
    Eye,
    Trash,
    Download,
    Share,
    Close,
    Lock,
    LockAlt
} from '../../Icons'

const actButtonVariation = {
    blue: css`
        background: ${props => props.theme.colors.blue};

        :hover {
            background: ${props => shade(0.15, props.theme.colors.blue)};
        }
    `,
    red: css`
        background: ${props => props.theme.colors.red};
        :hover {
            background: ${props => shade(0.15, props.theme.colors.red)};
        }
    `
}


export const Container = styled.div`
    height: 100%;
    display: block;
    overflow: auto;

    background: ${props => props.theme.colors.background};
    padding: 2.4rem;
    /* overflow: auto; */

    strong, h1, h2, h3 {
        color: ${props => props.theme.colors.title};
    }
`

export const Paper = styled.div`
    background: ${props => props.theme.colors.paper};
    width: min(964px, 90%);
    height: fit-content;
    border-radius: 8px;
    position: relative;
    /* box-shadow: 0px 0px 50px 18px rgba(0,0,0,0.1); */

    padding: 2.4rem;
    margin: auto;
    /* margin-top: 4rem; */

    & + div {
        margin-top: 3.2rem;
    }
`

export const PseudoInput = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background: ${props => darken(0.045, props.theme.colors.paper)};
    border-radius: 8px;

    & + div {
        margin-top: 1.2rem;
    }

    span {
        width: 9rem;
        display: flex;
        justify-content: center;
        border-radius: 8px 0 0 8px;
        background: ${props => props.theme.colors.background};

        color: ${props => props.theme.colors.title};
        font-weight: 600;

        border: solid 1px ${props => rgba(props.theme.colors.text, 0.15)};
        padding: .8rem 0;
        margin-right: 1.2rem;
    }
`

export const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(264px, 1fr));
    /* grid-template-columns: repeat(auto-fit, minmax(364px, 1fr)); */
    grid-gap: 1.6rem;

    /* width: 90%; */
    height: fit-content;
    margin: auto;

    /* padding: 2.4rem; */
    margin-top: 4rem;
`

export const StButton = styled(Button) <{ toRight?: boolean }>`
    width: fit-content;
    height: fit-content;
    border-radius: 4px;

    padding: 1rem 2.4rem;
    font-size: 2rem;
    font-weight: 900;

    margin-top: 2.4rem;

    ${props => !props.color && css`
        background: ${props.theme.colors.primary};

        :hover {
            background: ${shade(0.1, props.theme.colors.primary)} !important;
        }
    `}

    ${props => props.toRight && css`
        margin-left: auto;
    `}
`

export const StForm = styled(Form)`
    & > fieldset {
        h3 {
            margin-bottom: .8rem;
        }

        + fieldset {
            margin-top: 1.6rem;
        }

        label {
            display: block;
            margin-bottom: .4rem;
        }
    }
`

export const FormGroup = styled.div<{ mult?: boolean }>`
    + div {
        margin-top: 1.2rem;
    }

    label {
        display: block;
        margin-bottom: .4rem;
    }

    ${props => props.mult && css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
        grid-gap: 2rem;

        @media screen and (max-width: 490px) {
            grid-template-columns: 1fr;
            grid-gap: .8rem;
        }
    `}

`

export const FormInputContainer = styled.div<{ gridColumn?: string }>`
    grid-column: ${props => props.gridColumn ? props.gridColumn : 'auto'};

    @media screen and (max-width: 490px) {
        grid-column: auto;
    }
`

export const ActionButtonContainer = styled.div``
export const ActButton = styled.button<{ colorType: "red" | "blue" }>`
    padding: 0.4rem;
    border-radius: .4rem;
    background: ${props => props.theme.colors.red};

    font-size: 0;
    color: white;

    & + button {
        margin-left: .8rem;
    }

    :hover {
        background: ${props => shade(0.15, props.theme.colors.red)};
    }

    ${props => actButtonVariation[props.colorType]}
`

export const Copy = styled.span`
    display: block;
    width: fit-content;
    margin: 2.4rem auto 0;
`

export const ModalContainer = styled.div`
    background: ${props => props.theme.colors.paper};
    padding: 2.4rem;
    border-radius: 8px;
    position: relative;

    width: min(600px, 100%);
    margin: 6.4rem auto auto;

    a {
        color: ${props => props.theme.colors.primary};
    }

    h3 {
        margin-bottom: .8rem;
    }
    h2 {
        margin-bottom: 1rem;
    }
`
export const ModalGridRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
    grid-gap: 1.6rem;

    + div {
        margin-top: 2.4rem;
    }
`

export const ModalCloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;

    :hover {
        opacity: .5;
    }
`

export const ModalSubItem = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    /* margin-left: 2.4rem; */
`

const ModalIconCss = css`
    width: 2.4rem;
    height: 2.4rem;

    margin-right: 1rem;
`

const IconCss = css`
    width: 2rem;
    height: 2rem;

    margin-right: 1rem;
`

export const StEmail = styled(Email)`
    ${IconCss}
`
export const StUser = styled(User)`
    ${IconCss}
`
export const StUserAlt = styled(UserAlt)`
    ${IconCss}
`
export const StPassword = styled(Lock)`
    ${IconCss}
`
export const StPasswordAlt = styled(LockAlt)`
    ${IconCss}
`


export const StDownLoad = styled(Download)`
    ${ModalIconCss}
    color: ${props => props.theme.colors.primary};
`
export const StShare = styled(Share)`
    width: 2rem;
    height: 2rem;

    margin-right: 1rem;
`
export const StClose = styled(Close)`
    ${ModalIconCss}
`

export const StEye = styled(Eye)`
    width: 2rem;
    height: 2rem;
`
export const StTrash = styled(Trash)`
    width: 2rem;
    height: 2rem;
`

export const StatusFlag = styled.div<{
    colorType: "red" | "green" | "blue"
}>`
    background: ${props => props.theme.colors[props.colorType]};
    border-radius: 8px;
    color: white;
    font-weight: bold;

    padding: 1rem 0;
    width: 10rem;
    display: flex;
    justify-content: center;
`
