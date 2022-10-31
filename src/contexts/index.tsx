import { ToastProvider } from './toast'
import { AuthProvider } from './auth'

export const AppProvider: React.FC = ({ children }) => {
    return (
        <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
    )
}
