import { NextApiHandler } from 'next'
import { parseCookies } from 'nookies'
import { AUTH_TOKEN_KEY } from '../../contexts/auth'

import { getAPIClient } from '../../services/axios'
import { getAxiosError } from '../../utils/getAxiosError'

const UpdateAccountHandler: NextApiHandler = async (req, res) => {
    const { method, body: { account } } = req

    const { [AUTH_TOKEN_KEY]: token } = parseCookies({ req })

    if (!token) {
        res.status(401).end("Usuário não autorizado")
    }

    if (method === 'POST') {
        try {
            const api = getAPIClient({ req })

            const upAccRes = await api.post('/api/account', account, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const getUserRes = await api.get('/api/account', {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            res.status(200).json(getUserRes.data)
        } catch (error) {
            const { statusCode, message } = getAxiosError(error)
            res.status(statusCode).end(message)
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default UpdateAccountHandler
