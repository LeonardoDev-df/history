import { ToastProvider } from '../../../contexts/toast'

export const ToastLayout: React.FC = ({ children }) => {
    return <ToastProvider>{children}</ToastProvider>
}
