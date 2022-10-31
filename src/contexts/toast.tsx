import { useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { v4 } from 'uuid'

import { ToastContainer } from '../components/ToastContainer'

interface ToastContextData {
    addToast(message: Omit<ToastMessage, 'id'>): void
    removeToast(id: string): void
}

export interface ToastMessage {
    id: string
    type?: 'success' | 'error' | 'info'
    title: string
    description: string
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider: React.FC = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([])

    // Omit => vai pegar todos os atributos de ToastMessage menos o id
    const addToast = useCallback((message: Omit<ToastMessage, 'id'>) => {
        const id = v4()

        const newToast = {
            id,
            type: message.type,
            title: message.title,
            description: message.description
        }

        setToasts(oldToasts => [...oldToasts, newToast])
    }, [])
    const removeToast = useCallback((id: string) => {
        setToasts(oldToasts => oldToasts.filter(toast => toast.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            <ToastContainer toasts={toasts} />
            {children}
        </ToastContext.Provider>
    )
}

export { ToastProvider, ToastContext }
