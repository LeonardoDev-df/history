import { REQUEST, SUCCESS, FAILURE } from './action-type.util';

import { initialState } from '../index'

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
        payload?: any;
    }
    : {
        type: Key;
        payload: M[Key];
    };
};

export const ActionTypes = {
    LOGIN: 'authentication/LOGIN',
    GET_SESSION: 'authentication/GET_SESSION',
    RESET: 'reset'
}

// TODO: Como tipar os payload
// Omit<typeof initialState, 'isLoading'>

const Actions = (state: Readonly<typeof initialState>, payload: any) => ({
    [REQUEST(ActionTypes.LOGIN)]: () => ({
        ...state,
        isLoading: true
    }),
    [SUCCESS(ActionTypes.LOGIN)]: () => ({
        ...state,
        isLoading: false,
        account: payload
        // Outras info do context e talvez já receber o user daqui
    }),
    [FAILURE(ActionTypes.LOGIN)]: () => ({
        // Setar os erros
        ...state,
        isLoading: false
    }),

    [REQUEST(ActionTypes.GET_SESSION)]: () => ({
        ...state,
        isLoading: true
    }),
    [SUCCESS(ActionTypes.GET_SESSION)]: () => {
        // Checar autenticação(isAuthenticated)
        return {
            ...state,
            isLoading: false,
            account: payload
        }
    },
    [FAILURE(ActionTypes.GET_SESSION)]: () => ({
        ...state,
        isLoading: false,
        // Setar mensagem de erro e de autenticação
    }),
    [ActionTypes.RESET]: () => initialState
    // Talvez funções para limpar auth e mais
})

export function AuthReducer(state: Readonly<typeof initialState>, action: any) {
    return Actions(state, action.payload)[action.type]()
}


