import { useEffect, useState, useMemo } from 'react'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'

import OscarImage from '../../assets/centro-cultural-oscar-niemeyer.jpg'
import CatedralImage from '../../assets/catedral-de-brasilia.jpg'
import { getAPIClient } from '../../services/axios'
import { asyncHandler } from '../../utils/asyncHandler'
import { Container } from '../../styles/pages/map'
import Head from '../../infra/components/Head'
import { MapHistoricalSite } from '../../shared/model/site.model'

interface coords {
    lat: number
    lng: number
}

const TEST_DATA = [
    {
        id: 1,
        position: [51.505, -0.09],
        popupMessage: ` O Centro Cultural Oscar Niemeyer é um centro cultural localizado
            na Praça do Pacificador, s/n, no Centro de Duque de Caxias, no Rio
            de Janeiro, no Brasil. Foi projetado por Oscar Niemeyer...`,
        image: OscarImage,
        title: 'Espaço Oscar Niemeyer',
        address: 'Praça dos Três Poderes - Brasília, DF, 70297-400'
    },
    {
        id: 2,
        position: [51.505, -0.1],
        popupMessage: `A Catedral Metropolitana - Nossa Senhora Aparecida,
            mais conhecida como Catedral de Brasília, é um
            templo católico brasileiro, na qual se encontra a
            cátedra da Arquidiocese de Brasília...`,
        image: CatedralImage,
        title: 'Catedral Metropolitana de Brasília',
        address: 'Lote 12 - Brasília, DF, 70050-000'
    }
]

function SearchMap({
    historicalSites
}: {
    historicalSites: MapHistoricalSite[]
}) {
    const [mapPosition, setMapPosition] = useState<coords>({
        lat: -15.7897816,
        lng: -47.8904577
    })
    const [mapHistoricalSites, setMapHistoricalSites] = useState(
        historicalSites
    )

    useEffect(() => {
        console.log('search-map: ', historicalSites)
    }, [])

    // We use the dynamic function to ensure that the
    // React Component behave as a React Component
    // Dynamic imports it's just another way to split
    // your code into manageable chunks(pedaços).
    const MapComponent = useMemo(
        () =>
            dynamic(() => import('../../components/Map'), {
                // We want that this component render just in client-side
                ssr: false
            }),
        []
    )

    useEffect(() => {
        // Pega a posição do usuário
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords

                setMapPosition({
                    lat: Number(latitude.toFixed(3)),
                    lng: Number(longitude.toFixed(3))
                })
            },
            err => {
                console.error(err)
            }
        )
    }, [])

    return (
        <Container>
            <Head title="Mapa - RVHistory">
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                    crossOrigin=""
                />
            </Head>

            <MapComponent
                center={[mapPosition.lat, mapPosition.lng]}
                zoom={13}
                markers={mapHistoricalSites}
                initialPosition={[mapPosition.lat, mapPosition.lng]}
            />
        </Container>
    )
}

export default SearchMap

export const getServerSideProps: GetServerSideProps = async ctx => {
    const api = getAPIClient(ctx)

    const [response, error] = await asyncHandler(
        api.get('/api/historical-sites/map')
    )

    if (response && response.data) {
        const handledResponse = response.data.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description,
            image: item.siteImageMapDTOS[0].imagePreview,
            position: [Number(item.latitude), Number(item.longitude)],
            address: {
                streetAddress: item.streetAddress,
                city: item.city,
                uf: item.uf,
                zipCode: item.zipCode
            }
        }))

        return {
            props: {
                historicalSites: handledResponse
            }
        }
    }

    return {
        props: {}
    }
}
