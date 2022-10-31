import { useContext } from 'use-context-selector'

import { ToastContext } from '../contexts/toast'

export function useToast() {
    const context = useContext(ToastContext)

    if (!context || Object.keys(context).length === 0) {
        throw new Error('useToast must be within a ToastProvider')
    }

    return context
}
