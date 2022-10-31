import { useRef, useState, useEffect, InputHTMLAttributes } from 'react'

import { useField } from '@unform/core'

import { Container } from './styles'

interface CheckboxProps {
    name: string
    children?: React.ReactNode
    value?: string
}

export function CustomCheckbox({
    name,
    value,
    children,
    ...rest
}: CheckboxProps) {
    const inputRef = useRef<HTMLInputElement>()

    const {
        registerField,
        fieldName,
        defaultValue,
        error,
        clearError
    } = useField(name)

    const defaultChecked = defaultValue === value

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => ref.current.checked,
            setValue: (ref, value) => {
                ref.current.checked = value
            }
            // clearValue: ref => (ref.current.checked = defaultChecked)
        })

        clearError()
    }, [defaultValue, fieldName, registerField, defaultChecked])

    return (
        <Container isErrored={!!error}>
            <input
                defaultChecked={defaultChecked}
                ref={inputRef}
                value={value}
                type="checkbox"
                id={fieldName}
                {...rest}
            />

            <span></span>

            <div>{children}</div>
        </Container>
    )
}
