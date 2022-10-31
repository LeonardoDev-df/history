import {
    useRef,
    useState,
    useCallback,
    HTMLAttributes,
    ChangeEventHandler,
    KeyboardEventHandler
} from 'react'
import { useSpring, animated } from '@react-spring/web'

import { Container, ToolsContainer, StSearch, StClose } from './styles'

interface SearchInputProps extends HTMLAttributes<HTMLInputElement> {
    onButtonClick(value: string): void
}

export function SearchInput({
    onButtonClick,
    style,
    ...rest
}: SearchInputProps) {
    const [value, setValue] = useState('')
    const styles = useSpring({
        opacity: !!value ? 1 : 0,
        display: !!value ? 'inline-block' : 'none',
        transform: value ? 'translate3d(0%, 0, 0)' : 'translate3d(25%, 0, 0)'
    })

    const inputRef = useRef<HTMLInputElement>()

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        e => {
            const { value } = e.target

            setValue(value)
        },
        []
    )

    const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = useCallback(
        e => {
            if (e.key === 'Enter') {
                // @ts-ignore: Unreachable code error
                onButtonClick(e.target.value.trim())
            }
        },
        []
    )

    return (
        <Container style={style}>
            <ToolsContainer isFilled={!!value}>
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    {...rest}
                />

                <animated.div style={styles}>
                    <button onClick={() => setValue('')}>
                        <StClose />
                    </button>
                </animated.div>

                <button onClick={() => onButtonClick(value.trim())}>
                    <StSearch />
                </button>
            </ToolsContainer>
        </Container>
    )
}
