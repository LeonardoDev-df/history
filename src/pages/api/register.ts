import { NextApiHandler } from 'next'

import { api } from '../../services/api'
import { getAxiosError } from '../../utils/getAxiosError'

const registerHandler: NextApiHandler = async (req, res) => {
    const { body, method } = req
    if (method === 'POST') {
        try {
            const { login, email, firstName, password, langKey } = body

            const response = await api.post('/api/register', {
                login,
                email,
                firstName,
                password,
                langKey
            })

            res.status(response.status).json({ statusText: 'Certo' })
        } catch (error) {
            const { statusCode, message } = getAxiosError(error)
            res.status(statusCode).end(message)
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default registerHandler
