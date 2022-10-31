import { NextApiHandler } from 'next'
import { parseCookies } from 'nookies'
import { AUTH_TOKEN_KEY } from '../../../contexts/auth'

import { getAPIClient } from '../../../services/axios'
import { getAxiosError } from '../../../utils/getAxiosError'

const GetHistoricalSiteImageHandler: NextApiHandler = async (req, res) => {
    const { method, query: { idHistoricalSite, year } } = req
    console.log(idHistoricalSite, year)

    if (method === 'GET') {
        try {
            const api = getAPIClient({ req })

            const response = await api.get(`/api/site-images/${idHistoricalSite}/${year}`)

            const handledResponse = response.data.map((item, index) => {
                const {
                    numberImage,
                    // buttonPosition: { x, y, z },
                    image3D,
                    imagePreview
                    // year
                } = item

                return {
                    numberImage:
                        numberImage || index === response.data.length - 1
                            ? 0
                            : index + 1,
                    buttonColor: 'white',
                    buttonPosition: [12, 0, -16],
                    image3D: `data:image/jpeg;base64,${image3D}`,
                    imagePreview: `data:image/jpeg;base64,${imagePreview}`
                    // year: year || 2021
                }
            })

            res.status(200).json(handledResponse)
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

export default GetHistoricalSiteImageHandler
