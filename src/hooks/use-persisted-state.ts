import { parseCookies, setCookie } from 'nookies';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import light from '../styles/themes/light'
import dark from '../styles/themes/dark'

type Response<T> = [
    T,
    Dispatch<SetStateAction<T>>,
];

/**
 * @param  {string} key Chave de indentificação para armazenamento local
 * @param  {T} initialState Estado inicial do state
 *
 */

export default function usePersistedState<T>(key: string, initialState: T): Response<T> {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const storagedState = localStorage.getItem(key)
        setState(storagedState ? JSON.parse(storagedState) : initialState)
    }, [])

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

// With cookies version

// const ONE_HOUR = 60 * 60
// const ONE_DAY = 24 * ONE_HOUR
// const ONE_YEAR = 365 * ONE_DAY
// const TEN_YEARS = 10 * ONE_YEAR
// export default function usePersistedState<T>(key: string, initialState: any) {
//     const [state, setState] = useState(initialState);

//     useEffect(() => {
//         setCookie(undefined, key, state.title, {
//             maxAge: TEN_YEARS
//         })
//     }, [key, state]);

//     return [state, setState];
// }
