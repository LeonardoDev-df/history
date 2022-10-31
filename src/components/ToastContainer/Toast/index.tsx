import { useEffect, MouseEventHandler, MouseEvent, useState } from 'react'

import {
    Container,
    AlertIcon,
    CheckIcon,
    InfoIcon,
    XCircle,
    Loadbar
} from './styles'

import { useToast } from '../../../hooks/use-toast'
import { ToastMessage } from '../../../contexts/toast'

const icons = {
    info: <InfoIcon />,
    success: <CheckIcon />,
    error: <AlertIcon />
}

interface ToastProps {
    message: ToastMessage
    style: object
}

const DEZ_SEGUNDOS = 10000

export const Toast: React.FC<ToastProps> = ({ message, style }) => {
    const [time, setTime] = useState(DEZ_SEGUNDOS)
    const [isActive, setIsActive] = useState(true)
    const { removeToast } = useToast()

    let timerTimeOut: NodeJS.Timeout

    useEffect(() => {
        if (isActive && time > 0) {
            timerTimeOut = setTimeout(() => {
                setTime(oldTime => Math.abs(oldTime - 100))
            }, 100)
        } else if (isActive && time === 0) {
            removeToast(message.id)
        }

        // Quando retornamos uma função no useEffect ele o executa assim
        // que o componente desmontar ou deixar de existir
        // Fazendo o papel de componentDidUnmount() da classe
        return () => {
            // No caso limpamos o timer para não continuar mesmo o toast não existindo mais
            clearTimeout(timerTimeOut)
        }
    }, [isActive, time])

    const handleMouseEnterEvent: MouseEventHandler<HTMLDivElement> = () => {
        setIsActive(false)
    }

    const handleMouseLeaveEvent: MouseEventHandler<HTMLDivElement> = () => {
        setIsActive(true)
    }

    return (
        <Container
            type={message.type}
            $hasDescription={!!message.description}
            style={style}
            onMouseEnter={handleMouseEnterEvent}
            onMouseLeave={handleMouseLeaveEvent}
        >
            {icons[message.type || 'info']}

            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p>}
            </div>

            <button onClick={() => removeToast(message.id)}>
                <XCircle />
            </button>
            <Loadbar
                style={{
                    width: `${(time / DEZ_SEGUNDOS) * 100}%`
                }}
            />
        </Container>
    )
}
