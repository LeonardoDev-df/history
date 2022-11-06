import { useState, useEffect } from 'react'
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
import { StaticImageData } from '../../shared/model/user.model'

interface MarkerProps {
    id: string | number
    position: [number, number]
    popupMessage: string
    image: StaticImageData
    title: string
    address: string
}

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
    markers?: Array<MarkerProps>
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
                            title: item.title
                        })}
                    >
                        <StPopup>
                            <img
                                src={(item.image as any).src || item.image}
                                alt="Imagem do sítio"
                            />
                            <PopupBottom>
                                <p>
                                    <strong>Nome: </strong>
                                    {item.title}
                                </p>
                                <p>
                                    <strong>Descrição: </strong>
                                    {item.popupMessage}
                                </p>
                                <Button style={{ marginTop: '1.6rem' }}>
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
