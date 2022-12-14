import { NextApiHandler } from 'next'
import { parseCookies } from 'nookies'
import axios from 'axios'

import { AUTH_TOKEN_KEY } from '../../../contexts/auth'

import { getAPIClient } from '../../../services/axios'
import { getAxiosError } from '../../../utils/getAxiosError'

const CreateSiteHandler: NextApiHandler = async (req, res) => {
    const { method, body: { data } } = req

    const { [AUTH_TOKEN_KEY]: token } = parseCookies({ req })

    if (!token) {
        res.status(401).end("Usuário não autorizado")
    }

    if (method === 'POST') {
        try {
            const api = getAPIClient({ req })


            const response = await api.post('/api/historical-sites', JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json"
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            })

            res.status(200).json(response.data)
        } catch (error) {
            const { statusCode, message } = getAxiosError(error)
            console.log(message)
            res.status(statusCode).end(message)
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '40mb',
        },
    },
}

export default CreateSiteHandler
