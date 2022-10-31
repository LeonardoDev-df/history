import { NextApiHandler } from 'next'
import { parseCookies } from 'nookies'
import { AUTH_TOKEN_KEY } from '../../contexts/auth'

import { getAPIClient } from '../../services/axios'
import { getAxiosError } from '../../utils/getAxiosError'

const ChangePasswordHandler: NextApiHandler = async (req, res) => {
    const { method, body: { newPassword, currentPassword } } = req

    const { [AUTH_TOKEN_KEY]: token } = parseCookies({ req })

    if (!token) {
        res.status(401).end("Usuário não autorizado")
    }

    if (method === 'POST') {
        try {
            const api = getAPIClient({ req })

            const response = await api.post('/api/account/change-password', { currentPassword, newPassword }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            res.status(200).json(response.data)
        } catch (error) {
            const { statusCode, message } = getAxiosError(error)
            res.status(statusCode).end(message)
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default ChangePasswordHandler
