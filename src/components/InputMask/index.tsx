import { useRef, useEffect, useState, FocusEvent } from 'react'
import ReactInputMask, { Props as InputProps } from 'react-input-mask'
import { useField } from '@unform/core'

import { Container, Error, AlertIcon } from './styles'

interface Props extends InputProps {
    name: string
    onAdditionalBlur?(e: FocusEvent): any
    mask: string
}

export function InputMask({ name, onAdditionalBlur, mask, ...rest }: Props) {
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const {
        fieldName,
        registerField,
        defaultValue,
        error,
        clearError
    } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => ref.current.value,
            setValue(ref: any, value: string) {
                ref.current.value = value
            }
            // clearValue(ref: any) {
            //     ref.setInputValue('')
            // }
        })
    }, [fieldName, registerField])

    const handleInputFocus = () => setIsFocused(true)
    function handleInputBlur(e: FocusEvent<HTMLInputElement>) {
        setIsFocused(false)

        setIsFilled(!!inputRef.current.value)
        clearError()
        if (onAdditionalBlur) {
            onAdditionalBlur(e)
        }
    }

    return (
        <Container
            isFocused={isFocused}
            isFilled={isFilled}
            isErrored={!!error}
        >
            <ReactInputMask
                mask={mask}
                defaultValue={defaultValue}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                maskChar={null}
                {...rest}
            >
                {() => <input ref={inputRef} />}
            </ReactInputMask>

            {error && (
                <Error title={error}>
                    <AlertIcon />
                </Error>
            )}
        </Container>
    )
}
