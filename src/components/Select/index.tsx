import { useRef, useEffect, useContext } from 'react'
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select'
import { shade, darken } from 'polished'
import { useField } from '@unform/core'

import { StReactSelect } from './styles'
import { ThemeConfig } from 'react-select/src/theme'
import { DefaultTheme, ThemeContext } from 'styled-components'

interface Props extends SelectProps<OptionTypeBase> {
    name: string
    theme?: ThemeConfig & DefaultTheme
}

export function Select({ name, ...rest }: Props) {
    const selectRef = useRef(null)
    const {
        fieldName,
        defaultValue,
        registerField,
        error,
        clearError
    } = useField(name)
    const { colors } = useContext(ThemeContext)

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            background: state.isFocused
                ? darken(0.05, colors.input)
                : colors.input,
            color: state.isFocused && colors.title
        })
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            getValue: (ref: any) => {
                if (rest.isMulti) {
                    if (!ref.state.value) {
                        return []
                    }
                    return ref.state.value.map(
                        (option: OptionTypeBase) => option.value
                    )
                }
                if (!ref.state.value) {
                    return ''
                }
                return ref.state.value.value
            }
        })
    }, [fieldName, registerField, rest.isMulti])

    return (
        <StReactSelect
            styles={customStyles}
            // defaultValue={defaultValue}
            ref={selectRef}
            classNamePrefix="react-select"
            isErrored={!!error}
            onBlur={() => clearError()}
            {...rest}
        />
    )
}
