import { Google, Email, Lock, User } from '../Icons'

import styled, { css } from 'styled-components'

import { shade } from 'polished';

import { Form } from '@unform/web'

export const Container = styled.div`
    background: white;
    display: flex;

    border-top-right-radius: 1.6rem;
    border-bottom-right-radius: 1.6rem;

    /* color: ${props => props.theme.colors.title}; */
    color: var(--title);

    /* border-top-left-radius: 1.6rem;
    border-bottom-left-radius: 1.6rem; */

    width: 100%;
    height: 100%;

    & > div {
        width: min(460px, 90%);
        margin: auto;
        display: flex;
        flex-direction: column;

        > h1 {
            margin-bottom: 1.6rem;
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

            color: var(--title);

            span {
                color: ${props => props.theme.colors.secondary}
            }

            span:hover {
                color: ${props => shade(0.1, props.theme.colors.secondary)}
            }
        }
    }

    @media screen and (max-width: 930px) {
        border-radius: 1.6rem;
        padding: 2.4rem 0;
    }
`;

export const StForm = styled(Form)`
    > div {
        display: flex;
        flex-direction: column;

        label {
            font-family: 'Montserrat', sans-serif;
            font-weight: 900;
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
        }

        div {
            margin-top: 0.2rem;
        }

        + div {
            margin-top: 1rem;
        }
    }
`

export const StGoogle = styled(Google)`
    width: 4rem;
    height: 4rem;

    margin-right: 1.6rem;
`

const InputIconCss = css`
    width: 2rem;
    height: 2rem;

    margin-right: 1.6rem;
`

export const StEmail = styled(Email)`
    ${InputIconCss}
`
export const StPassword = styled(Lock)`
    ${InputIconCss}
`

export const StUser = styled(User)`
    ${InputIconCss}
`
