import { Container } from './styles'

interface TooltipProps {
    title: string
    className?: string
    children: React.ReactNode
}

export function Tooltip({ title, className, children }: TooltipProps) {
    return (
        <Container className={className}>
            {children}
            <span>{title}</span>
        </Container>
    )
}
