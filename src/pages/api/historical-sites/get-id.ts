import { NextApiHandler } from 'next'
import { parseCookies } from 'nookies'
import { AUTH_TOKEN_KEY } from '../../../contexts/auth'

import { getAPIClient } from '../../../services/axios'
import { getAxiosError } from '../../../utils/getAxiosError'

const GetHistoricalSiteHandler: NextApiHandler = async (req, res) => {
    const { method, query: { idHistoricalSite } } = req
    console.log(idHistoricalSite)

    if (method === 'GET') {
        try {
            const api = getAPIClient({ req })

            const response = await api.get(`/api/historical-sites/${idHistoricalSite}`)

            const {
                id,
                name,
                description,
                years,
                address: { streetAddress, city, uf, zipCode },
                like
            } = response.data

            const handledSiteInfoRes = {
                id,
                name,
                like: like || 0,
                description,
                years: years || [2021],
                address: {
                    streetAddress,
                    city,
                    uf,
                    zipCode
                }
            }

            res.status(200).json(handledSiteInfoRes)
        } catch (error) {
            const { statusCode, message } = getAxiosError(error)
            console.log(message)
            res.status(statusCode).end(message)
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default GetHistoricalSiteHandler
