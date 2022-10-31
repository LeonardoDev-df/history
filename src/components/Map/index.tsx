import {
    useState,
    useEffect,
    useCallback,
    MouseEventHandler,
    MouseEvent
} from 'react'
import { useRouter } from 'next/router'
import {
    MapContainer,
    TileLayer,
    Marker,
    ZoomControl,
    MapConsumer
} from 'react-leaflet'
import { LatLngExpression, ZoomPanOptions, Map } from 'leaflet'

import { SearchMapSide } from '../../components/SearchMapSide'
import { MAPBOX_ACCESS_TOKEN } from '../../config/constants'
import { LeafletIcon } from '../../components/MarkerIcon'
import { Button } from '../../components/Button'
import { StPopup, PopupBottom } from './styles'
import { MapHistoricalSite } from '../../shared/model/site.model'

export interface MapFunctionsProps {
    setView: (
        center: LatLngExpression,
        zoom?: number,
        options?: ZoomPanOptions
    ) => Map
}
interface MapProps {
    children?: React.ReactNode
    center: [number, number]
    markers?: Array<MapHistoricalSite>
    initialPosition?: [number, number]
    getMapFunctions?(mapFunc: MapFunctionsProps): void
    zoom: number
}

function MapComponent({
    children,
    center,
    zoom,
    markers,
    initialPosition
}: MapProps) {
    const router = useRouter()

    const handleButtonClick = useCallback((item: MapHistoricalSite) => {
        router.push(`/3d-view?idHistoricalSite=${item.id}&year=${2021}`)
    }, [])

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{
                width: '100%',
                height: '100%'
            }}
            zoomControl={false}
        >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`}
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                maxZoom={18}
                minZoom={2}
                id="mapbox/streets-v11"
                tileSize={512}
                zoomOffset={-1}
                accessToken={MAPBOX_ACCESS_TOKEN}
            />
            <ZoomControl position="bottomright" />

            {markers &&
                markers.map(item => (
                    <Marker
                        key={item.id.toString()}
                        position={item.position}
                        icon={LeafletIcon({
                            image: item.image,
                            title: item.name
                        })}
                    >
                        <StPopup>
                            <img
                                src={`data:image/jpeg;base64,${item.image}`}
                                alt="Imagem do sítio"
                            />
                            <PopupBottom>
                                <p>
                                    <strong>Nome: </strong>
                                    {item.name}
                                </p>
                                <p>
                                    <strong>Descrição: </strong>
                                    {item.description}
                                </p>
                                <Button
                                    style={{ marginTop: '1.6rem' }}
                                    onClick={() => handleButtonClick(item)}
                                >
                                    Visitar
                                </Button>
                            </PopupBottom>
                        </StPopup>
                    </Marker>
                ))}

            <Marker key={109} position={initialPosition} />
            <SearchMapSide data={markers} />
        </MapContainer>
    )
}

export default MapComponent
