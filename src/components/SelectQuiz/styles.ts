import styled, { DefaultTheme, StyledComponent, css } from 'styled-components'
import Select from 'react-select'
import { darken, shade } from 'polished'

interface SelectProps {
    isErrored: boolean
}

export const StReactSelect = styled(Select) <SelectProps>`
    width: 100%;
    > div {
        background: ${props => props.theme.colors.input};
        border-color: ${props => props.theme.colors.input};
        border-width: 0px;
        border-radius: 8px;

        padding: 4px 0;
        font-weight: 500;

        .react-select__value-container .react-select__single-value {
            color: ${props => darken(0.05, props.theme.colors.title)};
        }

        ${props => props.isErrored && css`
            border-color: ${props.theme.colors.red};
        `}

        @media screen and (max-width: 768px) {
            padding: 0;
        }
    }

    .react-select__menu .react-select__menu-list .react-select__option {
        :hover, .active {
            background: ${props => darken(0.05, props.theme.colors.input)};
        }
    }
`
