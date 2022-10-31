import axios from 'axios'
import { parseCookies } from 'nookies'

import { SERVER_API_URL } from '../config/constants'

const TIMEOUT = 1 * 6 * 10000 // Um minuto
const AUTH_TOKEN_KEY = 'rvh-authenticationToken'

export function getAPIClient(ctx?: any) {
    const { [AUTH_TOKEN_KEY]: token } = parseCookies(ctx)

    const api = axios.create({
        baseURL: SERVER_API_URL,
        timeout: TIMEOUT
    })

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    return api
}
