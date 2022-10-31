// import { useContext } from 'react'
import { useContext, useContextSelector } from 'use-context-selector'

import { AuthContext } from '../contexts/auth'

export function useAuth() {
    const context = useContext(AuthContext) || undefined

    if (!context || Object.keys(context).length === 0) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
