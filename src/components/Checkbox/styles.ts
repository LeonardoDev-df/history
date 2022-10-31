import styled, { css } from 'styled-components'

import { Calendar, Check } from '../../styles/Icons'

interface ContainerProps {
    isErrored: boolean
}

export const Container = styled.label<ContainerProps>`
    display: flex;
    align-items: center;
    position: relative;

    height: 2.2rem;
    padding-left: 3.2rem;
    margin-top: 1.2rem;

    cursor: pointer;
    user-select: none;

    & > label {
        font-weight: 600;
    }

    & > input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;


        :active {
            transform: scale(0.9,0.9);
        }

        :checked ~ span{
            background: ${props => props.theme.colors.primary};
            border-color: ${props => props.theme.colors.primary};
        }

        :checked ~ span:after {
            display: block;
        }
    }

    & > span {
        position: absolute;
        top: 0;
        left: 0;
        height: 2.2rem;
        width: 2.2rem;
        /* background-color: #eee; */

        transition: 0.1s;

        border-radius: 4px;
        border: 1.5px solid ${props => props.theme.colors.gray_light};

        :after {
            content: "";
            position: absolute;
            display: none;

            left: 6px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
        }

        ${props => props.isErrored && css`
            border-color: ${props => props.theme.colors.red};
        `}
    }
`

