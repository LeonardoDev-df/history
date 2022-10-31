import { NextApiHandler } from 'next'
import { getAPIClient } from '../../../services/axios'

import { getAxiosError } from '../../../utils/getAxiosError'

const handlePasswordResetFinish: NextApiHandler = async (req, res) => {
    const { body: { key, newPassword }, method } = req

    if (method === 'POST') {
        try {
            const api = getAPIClient(req)
            await api.post('/api/account/reset-password/finish', { key, newPassword })
            res.status(200).json({ message: "Success, password reseted" })
        } catch (error) {
            const { statusCode, message } = getAxiosError(error)
            res.status(statusCode).end(message)
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default handlePasswordResetFinish

