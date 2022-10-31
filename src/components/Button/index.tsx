import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLProps } from 'react'
import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: string
    Icon?: string
    tintColor?: string
    color?: string
}

export function Button({
    children,
    color,
    tintColor,
    Icon,
    ...rest
}: ButtonProps) {
    return (
        <Container color={color} tintColor={tintColor} {...rest}>
            {Icon && <Icon />}
            {children}
        </Container>
    )
}
