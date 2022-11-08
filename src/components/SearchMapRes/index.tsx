import { HTMLAttributes, MouseEvent } from 'react'
import {
    MapHistoricalSite,
    StaticImageData
} from '../../shared/model/site.model'

import { Container, ImageWrapper, AsideData } from './styles'

interface SearchInputProps
    extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
    data: MapHistoricalSite
    onCustomClick(
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
        item: MapHistoricalSite
    ): void
}

export function SearchMapRes({
    data,
    onCustomClick,
    ...rest
}: SearchInputProps) {
    let shortDescription = data.description

    if (data.description.length >= 40) {
        shortDescription = data.description.substring(0, 39).trim() + '...'
    }

    return (
        <Container
            onClick={e => {
                onCustomClick(e, data)
            }}
            {...rest}
        >
            <ImageWrapper>
                <img
                    src={`data:image/jpeg;base64,${data.image}`}
                    alt={data.name}
                />
            </ImageWrapper>

            <AsideData>
                <h3>{data.name}</h3>
                {/* <p>{shortDescription}</p> */}
                <small>{`${data.address.streetAddress} - ${data.address.city}, ${data.address.city}, ${data.address.uf}, ${data.address.zipCode}`}</small>
            </AsideData>
        </Container>
    )
}
