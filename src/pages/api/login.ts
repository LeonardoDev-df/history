import { NextApiHandler } from 'next'

import { api } from '../../services/api'
import { getAxiosError } from '../../utils/getAxiosError'

const loginHandler: NextApiHandler = async (req, res) => {
    const { body: { username, password }, method } = req

    if (method === 'POST') {
        // POST request
        try {
            const {
                data: { ['id_token']: token }
            } = await api.post<{ id_token: string }>('/api/authenticate', {
                username,
                password
            })

            const getResponse = await api.get('/api/account', {
                params: {
                    username,
                    password
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            // Success response
            res.status(200).json({ token, user: getResponse.data })
        } catch (error) {
            const { statusCode, message } = getAxiosError(error)
            res.status(statusCode).end(message)
        }
    } else {
        // Any other HTTP request
        // Setting what type of request is allowed for this endpoint
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default loginHandler
