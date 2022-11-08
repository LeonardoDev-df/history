import { NextApiHandler } from 'next'

import { IUser } from './../../../shared/model/user.model';
import { getAPIClient } from '../../../services/axios'
import { getAxiosError } from '../../../utils/getAxiosError'

const deleteUserHandler: NextApiHandler = async (req, res) => {
    const { method, query: { login } } = req

    if (method === 'DELETE') {
        try {
            const api = getAPIClient({ req })

            const { data } = await api.delete(`/api/admin/users/${login}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            res.status(200).json(data)
        } catch (error) {
            const { statusCode, message } = getAxiosError(error)
            res.status(statusCode).end(message)
        }
    } else {
        res.setHeader('Allow', ['DELETE'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default deleteUserHandler
