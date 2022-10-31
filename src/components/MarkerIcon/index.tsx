import { renderToString } from 'react-dom/server'
import StaticSiteImage from '../../assets/site-image.jpg'

import L from 'leaflet'

import { Container, BottomPart, StImage } from './styles'
import { StaticImageData } from '../../shared/model/user.model'

interface MarkerIconProps {
    image: StaticImageData
    title: string
}

export function MarkerIcon({ image, title }: MarkerIconProps) {
    // console.log(StaticSiteImage)

    return (
        <Container>
            <img src={(image as any).src || image} />
            <BottomPart>
                {`${title.substring(0, 10).trim()}...` || title}
            </BottomPart>
        </Container>
    )
}

export function LeafletIcon(props: MarkerIconProps) {
    const Icon = L.divIcon({
        className: '',
        html: renderToString(<MarkerIcon {...props} />),
        iconAnchor: [50, 90],
        popupAnchor: [0, -85]
    })

    return Icon
}
