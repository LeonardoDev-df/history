import { NextApiHandler } from 'next'

import { IUser } from './../../../shared/model/user.model';
import { getAPIClient } from '../../../services/axios'
import { getAxiosError } from '../../../utils/getAxiosError'

const getUsersHandler: NextApiHandler = async (req, res) => {
    const { method } = req

    if (method === 'GET') {
        try {
            const api = getAPIClient({ req })

            // Acredito não precisar de query porque ele pega do token
            // Então somente se certificar de que o token exista
            const { data } = await api.get<IUser[]>('/api/admin/users', {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            // Só usuários sem poder de admin
            const handledData = data.filter(item => !item.authorities.includes('ROLE_ADMIN'))
            res.status(200).json(handledData)
        } catch (error) {
            const { statusCode, message } = getAxiosError(error)
            res.status(statusCode).end(message)
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default getUsersHandler
