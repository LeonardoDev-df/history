import { useCallback, useEffect, useReducer } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { createContext } from 'use-context-selector'
import { useRouter } from 'next/router'
import axios from 'axios'

import { REQUEST, SUCCESS, FAILURE } from './reducers/action-type.util'
import { AuthReducer, ActionTypes } from './reducers/authentication'
import { IUser } from '../../shared/model/user.model'
import { api } from '../../services/api'
import { useToast } from '../../hooks/use-toast'

type SignInProps = {
    username: string
    password: string
    rememberMe?: boolean
}

export interface AuthContextData {
    account: IUser
    isLoading: boolean
    isAuthenticated: boolean
    signIn(data: SignInProps): Promise<void>
    logOut(): void
    getSetUserData(): Promise<void>
    setUserData(data: IUser): void
}

export const AUTH_TOKEN_KEY = 'rvh-authenticationToken'

export const AuthContext = createContext({} as Readonly<AuthContextData>)

export const initialState = {
    isLoading: false,
    account: {} as IUser
}

export type AuthenticationState = Readonly<AuthContextData>

const AuthProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    const router = useRouter()
    const { addToast } = useToast()

    const isAuthenticated = !!state.account

    const getSetUserData = useCallback(async () => {
        try {
            const { [AUTH_TOKEN_KEY]: token } = parseCookies()

            // Se token existe então também existe um user
            if (token) {
                dispatch({
                    type: REQUEST(ActionTypes.GET_SESSION)
                })
                // busca as info do user
                const { data: user } = await axios.get('/api/get-user')

                dispatch({
                    type: SUCCESS(ActionTypes.GET_SESSION),
                    payload: user
                })

                addToast({
                    type: 'success',
                    title: 'Sucesso!!!',
                    description: 'busca dos seus dados efetuado com sucesso'
                })
            }
        } catch (err) {
            dispatch({
                type: FAILURE(ActionTypes.GET_SESSION)
            })

            addToast({
                type: 'error',
                title: 'Ocorreu um erro ao buscar seus dados',
                description: 'Não foi possível buscar seus dados na aplicação'
            })
        }
    }, [])

    const setUserData = useCallback((data: IUser) => {
        dispatch({
            type: SUCCESS(ActionTypes.GET_SESSION),
            payload: data
        })
    }, [])

    const signIn = useCallback(
        async ({ username, password, rememberMe = false }: SignInProps) => {
            try {
                dispatch({
                    type: REQUEST(ActionTypes.LOGIN)
                })

                const {
                    data: { token, user }
                } = await axios.post<{ token: string; user: IUser }>(
                    '/api/login',
                    {
                        username,
                        password,
                        rememberMe
                    }
                )

                if (token) {
                    const interval = new Date()
                    interval.setDate(interval.getDate() + 1)
                    setCookie(undefined, AUTH_TOKEN_KEY, token, {
                        // maxAge: 60 * 60 * 3 // 3 hour
                        expires: interval,
                        path: '/'
                    })

                    api.defaults.headers['Authorization'] = `Bearer ${token}`
                }

                if (user) {
                    dispatch({
                        type: SUCCESS(ActionTypes.LOGIN),
                        payload: user
                    })

                    addToast({
                        type: 'success',
                        title: 'Sucesso!!!',
                        description: 'Login efetuado com sucesso'
                    })
                    router.push(`/control-panel/${user.login}/profile`)
                } else {
                    addToast({
                        type: 'error',
                        title: 'Ocorreu um erro durante o login',
                        description:
                            'Não foi possível fazer login na aplicação. Tente novamente'
                    })
                }
            } catch (error) {
                dispatch({
                    type: FAILURE(ActionTypes.LOGIN)
                })

                addToast({
                    type: 'error',
                    title: 'Ocorreu um erro durante o login',
                    description: 'Não foi possível fazer login na aplicação'
                })
            }
        },
        []
    )
    const logOut = useCallback(() => {
        dispatch({
            type: ActionTypes.RESET
        })

        destroyCookie(undefined, AUTH_TOKEN_KEY, {
            path: '/'
        })
        router.push('/signIn')
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isLoading: state.isLoading,
                isAuthenticated,
                account: state.account,
                signIn,
                logOut,
                getSetUserData,
                setUserData
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
