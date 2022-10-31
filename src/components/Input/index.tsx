import {
    FocusEvent,
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState
} from 'react'
import { useField } from '@unform/core'

import { Container, CheckIcon, Error, AlertIcon } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    Icon?: string
    themeType?: 'light' | 'dark'
    onAdditionalBlur?(e: FocusEvent): any
}

export function Input({
    name,
    Icon,
    themeType = 'dark',
    onAdditionalBlur,
    ...rest
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    const inputRef = useRef<HTMLInputElement>()

    const {
        registerField,
        fieldName,
        defaultValue,
        error,
        clearError
    } = useField(name)

    const handleInputFocus = () => setIsFocused(true)
    function handleInputBlur(e: FocusEvent<HTMLInputElement>) {
        setIsFocused(false)

        setIsFilled(!!inputRef.current.value)
        clearError()
        if (onAdditionalBlur) {
            onAdditionalBlur(e)
        }
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => ref.current.value,
            setValue: (ref, value) => {
                ref.current.value = value
            }
            // clearValue: ref => {
            //     ref.current.value = ''
            // }
        })
    }, [registerField, fieldName])

    return (
        <Container
            isFocused={isFocused}
            isFilled={isFilled}
            isErrored={!!error}
            themeType={themeType}
        >
            {Icon && (
                <div>
                    <Icon />
                </div>
            )}
            <input
                ref={inputRef}
                defaultValue={defaultValue}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...rest}
            />

            {/* <CheckIcon
                isFocused={isFocused}
                isFilled={isFilled}
                isErrored={!!error}
            /> */}

            {error && (
                <Error title={error}>
                    <AlertIcon />
                </Error>
            )}
        </Container>
    )
}
