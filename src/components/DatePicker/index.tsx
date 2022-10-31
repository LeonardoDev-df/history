import {
    useRef,
    useState,
    useEffect,
    InputHTMLAttributes,
    ChangeEvent
} from 'react'
import { ReactDatePickerProps } from 'react-datepicker'

import { useField } from '@unform/core'

import { Container, Error, AlertIcon } from './styles'

interface DatePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
    name: string
    Icon: string
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    Icon: string
}

export function CustomDatePicker({ name, Icon, ...rest }: InputProps) {
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    const datepickerRef = useRef(null)

    const {
        registerField,
        fieldName,
        defaultValue,
        error,
        clearError
    } = useField(name)

    const [date, setDate] = useState<Date>(defaultValue || null)

    const handleInputFocus = () => setIsFocused(true)
    function handleInputBlur() {
        setIsFocused(false)

        setIsFilled(!!datepickerRef.current?.value)
        clearError()
    }

    function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
        const eventDate = new Date(event.target.value)

        eventDate.setDate(eventDate.getDate() + 1)

        setDate(eventDate)
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: datepickerRef,
            getValue: ref => ref.current.value,
            setValue: (ref, value) => {
                ref.current.value = value
            }
        })
    }, [fieldName, registerField])

    return (
        <Container
            isFocused={isFocused}
            isFilled={isFilled}
            isErrored={!!error}
        >
            {/* <button> */}
            <Icon />
            {/* </button> */}

            <input
                type="date"
                ref={datepickerRef}
                // selected={date}
                // value={date}
                onChange={handleDateChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="dd/mm/yyyy"
                {...rest}
            />

            <p>{date ? date.toLocaleDateString('pt-BR') : 'dd/mm/aaaa'}</p>

            {error && (
                <Error title={error}>
                    <AlertIcon />
                </Error>
            )}
        </Container>
    )
}
