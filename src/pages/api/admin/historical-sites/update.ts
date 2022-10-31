import { NextApiHandler } from 'next'

import { getAPIClient } from '../../../../services/axios'
import { getAxiosError } from '../../../../utils/getAxiosError'

const updateHistoricalSiteHandler: NextApiHandler = async (req, res) => {
    const { method, query: { id }, body } = req

    if (method === 'PUT') {
        try {
            const api = getAPIClient({ req })

            const { data } = await api.put(`/api/historical-sites/status/${id}`, body, {
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
        res.setHeader('Allow', ['PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default updateHistoricalSiteHandler
