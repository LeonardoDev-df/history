import { AxiosError } from 'axios'


export function getAxiosError(error: AxiosError) {
    let statusCode: number
    let message: string

    if (error.response) {
        // Request made and server responded
        statusCode = Number(error.response.status)
        message = JSON.stringify(error.response.data)
    } else if (error.request) {
        // The request was made but no response was received
        statusCode = 504
        message = JSON.stringify(error.message)
    } else {
        // Something happened in setting up the request that triggered an err
        statusCode = 500
        message = "Something happened in setting up the request that triggered an error"
    }

    return {
        statusCode,
        message
    }
}
