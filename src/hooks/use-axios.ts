import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { api } from '../services/api'

const TIMEOUT = 1 * 6 * 1000 // Um minuto

axios.defaults.headers.timeout = TIMEOUT

export function useAxios(axiosParams: AxiosRequestConfig) {
    const [response, setResponse] = useState<AxiosResponse>()
    const [error, setError] = useState<AxiosError>()
    const [loading, setLoading] = useState(true)


    async function fetchData(params: AxiosRequestConfig) {
        try {
            const res = await axios.request(params)
            setResponse(res.data)
        } catch (err) {
            if ((err as AxiosError).isAxiosError === true) {
                setError(err)
            }
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        fetchData(axiosParams)
    }, [])

    return { response, error, loading }
}
