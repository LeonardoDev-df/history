import { useRef, useEffect, TextareaHTMLAttributes, useState } from 'react'
import { useField } from '@unform/core'

import { Container } from './styles'

interface Props {
    name: string
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & Props

export function Textarea({ name, ...rest }: TextareaProps) {
    const [isFocused, setIsFocused] = useState(false)
    const { fieldName, defaultValue = '', registerField, error } = useField(
        name
    )
    const textareaRef = useRef(null)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: textareaRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, value) => {
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            }
        })
    }, [fieldName, registerField])

    /**
     * If you need to set a default value for the textarea,
     * use the initial data property on your form,
     * or set it dynamically (be aware of the differences).
     *
     * initial data: https://unform.dev/guides/initial-data
     * set field value: https://unform.dev/guides/get-set-field-value
     */

    function handleTextareaFocus() {
        setIsFocused(true)
    }
    function handleTextareaBlur() {
        setIsFocused(false)
    }

    return (
        <Container isErrored={!!error} isFocused={isFocused}>
            <textarea
                ref={textareaRef}
                id={fieldName}
                defaultValue={defaultValue}
                onFocus={handleTextareaFocus}
                onBlur={handleTextareaBlur}
                {...rest}
            />

            {error && <span>{error}</span>}
        </Container>
    )
}
