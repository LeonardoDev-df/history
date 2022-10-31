import { Container } from './styles'

interface ModalProps {
    isVisible: boolean
    children: React.ReactNode
}

export function Modal({ isVisible, children }: ModalProps) {
    return <Container isVisible={isVisible}>{children}</Container>
}
