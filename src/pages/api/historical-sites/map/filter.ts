import { NextApiHandler } from 'next'
import { parseCookies } from 'nookies'
import axios from 'axios'

import { AUTH_TOKEN_KEY } from '../../../../contexts/auth'

import { getAPIClient } from '../../../../services/axios'
import { getAxiosError } from '../../../../utils/getAxiosError'

const FilterMapSites: NextApiHandler = async (req, res) => {
    const { method, query: { s } } = req

    if (method === 'GET') {
        try {
            const api = getAPIClient({ req })

            const response = await api.get(`api/historical-sites/map/filter?filter=${s}`)

            res.status(200).json(response.data)
        } catch (error) {
            const { statusCode, message } = getAxiosError(error)
            console.log(message, axios.isAxiosError(error))
            res.status(statusCode).end(message)
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default FilterMapSites
