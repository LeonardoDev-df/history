import { useContextSelector } from 'use-context-selector'

import { AuthContext } from '../contexts/auth'

export function useLoginAuth() {
    const isLoading = useContextSelector(AuthContext, c => c.isLoading)
    const login = useContextSelector(AuthContext, c => c.signIn)

    return {
        isLoading,
        login
    }
}
