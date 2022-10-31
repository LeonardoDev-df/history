import { NextApiHandler } from 'next'
import { getAPIClient } from '../../../services/axios'

import { getAxiosError } from '../../../utils/getAxiosError'

const handlePasswordResetInit: NextApiHandler = async (req, res) => {
    const { body: { email }, method } = req

    if (method === 'POST') {
        try {
            const api = getAPIClient(req)
            await api.post('/api/account/reset-password/init', email, {
                // If the content-type isn't set that way, axios will try to encode the body and thus modify the data sent to the server.
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            res.status(200).json({
                message: "Success reset-password initiation, look at your email."
            })
        } catch (error) {
            const { statusCode, message } = getAxiosError(error)
            res.status(statusCode).end(message)
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default handlePasswordResetInit
