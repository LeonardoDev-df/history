import { useTransition } from '@react-spring/web'

import { Container } from './styles'

import { ToastMessage } from '../../contexts/toast'
import { Toast } from './Toast'

interface ToastContainerProps {
    toasts: ToastMessage[]
}

export function ToastContainer({ toasts }: ToastContainerProps) {
    const toastsWithTransition = useTransition(toasts, {
        from: { right: '-120%', opacity: 0 },
        enter: { right: '0%', opacity: 1 },
        leave: { right: '-120%', opacity: 0 },
        delay: 200
        // config: config.molasses,
        // onRest: () => setItems([]),
    })

    return (
        <Container>
            {toastsWithTransition((styles, item) => (
                <Toast key={item.id} message={item} style={styles} />
            ))}
        </Container>
    )
}
