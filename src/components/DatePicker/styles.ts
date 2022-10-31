import styled, { css } from 'styled-components'
import ReactDatePicker from 'react-datepicker'

import { AlertTriangle, Check, Calendar } from '../../styles/Icons'

import { Tooltip } from '../../components/Tooltip'

interface ContainerProps {
    isErrored: boolean
    isFilled: boolean
    isFocused: boolean
}

export const Container = styled.div<ContainerProps>`
    background: #ececec;
    border-radius: 8px;
    border: 2px solid #ececec;

    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    position: relative;
    width: 100%;
    height: 4.8rem;

    padding: 0 1.6rem;

    input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;

        ::-webkit-calendar-picker-indicator {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            cursor: pointer;
        }
    }
    p {
        width: 100%;
    }


    ${(props) => props.isFocused && css`
            border-color: #F79D14;
    `}

    ${(props) => props.isErrored && css`
            border-color: ${props => props.theme.colors.red};
    `}
`

export const DatePicker = styled(ReactDatePicker)`
    width: 100%;
    padding: 1rem 0;

    color: ${props => props.theme.colors.title};
    font-family: 'Roboto', sans-serif;
    font-size: 1.4rem;
    font-weight: 600;

    .react-datepicker {
        font-size: 12.8px;
    }
`

export const StCalendar = styled(Calendar)`
    width: 2.4rem;
    height: 2.4rem;

    margin-right: 1.6rem;
    color: ${props => props.theme.colors.title};
`

export const Error = styled(Tooltip)`
    margin-left: 1.6rem;

    span {
        background: ${props => props.theme.colors.red};


        &::before {
            border-color: ${props => props.theme.colors.red} transparent;
        }
    }
`

export const AlertIcon = styled(AlertTriangle)`
    width: 2rem;
    height: 2rem;

    color: ${props => props.theme.colors.red};
`
