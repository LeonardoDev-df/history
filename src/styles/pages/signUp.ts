import {
    Google,
    Email,
    Lock,
    LockAlt,
    User,
    Calendar,
    UserAlt
} from '../Icons'

import styled, { css } from 'styled-components'

import { shade } from 'polished';

import { Form } from '@unform/web'


export const Container = styled.div`
    background: white;
    display: flex;
    /* flex-direction: column;
    justify-content: center;
    align-items: center; */

    border-top-right-radius: 1.6rem;
    border-bottom-right-radius: 1.6rem;

    color: var(--title);

    /* border-top-left-radius: 1.6rem;
    border-bottom-left-radius: 1.6rem; */

    width: 100%;
    height: 100%;

    & > div {
        width: min(460px,90%);
        margin: auto;
        display: flex;
        flex-direction: column;

        h1 {
            /* margin-bottom: 1.6rem; */
            width: 100%;
        }


        > span {
            font-weight: 600;
            font-size: 1.4rem;

            margin: 1.6rem 0;

            display: flex;
            justify-content: center;
            align-items: center;

            p {
                margin: 0 1.6rem;
            }

            div {
                width: 100%;
                height: 1px;
                background: ${props => props.theme.colors.gray_light};
            }
        }

        small {
            font-size: 1.2rem;
            margin: 0.8rem 0;

            color: inherit;

            span {
                color: ${props => props.theme.colors.secondary};
            }

            span:hover {
                color: ${props => shade(0.1, props.theme.colors.secondary)}
            }
        }
    }

    @media screen and (max-width: 930px) {
        border-radius: 1.6rem;
        padding: 1.6rem 0;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.6rem;

    @media screen and (max-width: 930px) {
        margin-bottom: .8rem;
    }
`

export const StForm = styled(Form)`
    & > div {
        margin-top: 0.2rem;
        display: flex;
        flex-direction: column;

        label {
            margin-bottom: 0.5rem;
        }

        + div {
            margin-top: 0.8rem;
        }
    }

    label {
        font-family: 'Montserrat', sans-serif;
        font-weight: 900;
        font-size: 1.25rem;
    }

    & > section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(205px, 1fr));
        grid-gap: 1rem;

        > div {
            margin-top: 0.8rem;

            display: flex;
            flex-direction: column;

            label {
                margin-bottom: 0.5rem;
            }
        }
    }

    @media screen and (max-width: 518px) {
        & > section {
            grid-gap: 0;
            grid-template-columns: 1fr;
        }
    }
`

export const StGoogle = styled(Google)`
    color: ${props => props.theme.colors.primary};

    width: 2.4rem;
    height: 2.4rem;

    margin-right: 1rem;
`

const InputIconCss = css`
    width: 2rem;
    height: 2rem;

    margin-right: 1rem;
`

export const StEmail = styled(Email)`
    ${InputIconCss}
`
export const StPassword = styled(Lock)`
    ${InputIconCss}
`
export const StPasswordAlt = styled(LockAlt)`
    ${InputIconCss}
`
export const StCalendar = styled(Calendar)`
    ${InputIconCss}
`
export const StUser = styled(User)`
    ${InputIconCss}
`
export const StUserAlt = styled(UserAlt)`
    ${InputIconCss}
`
