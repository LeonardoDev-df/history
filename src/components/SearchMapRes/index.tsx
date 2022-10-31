import { HTMLAttributes, MouseEvent } from 'react'
import { StaticImageData } from '../../shared/model/user.model'

import { Container, ImageWrapper, AsideData } from './styles'
interface ShortMouseEvent {
    e: MouseEvent<HTMLButtonElement, MouseEvent>
    item: DataItem
}

type DataItem = {
    id: string | number
    position: [number, number]
    popupMessage: string
    image: StaticImageData
    title: string
    address: string
}

interface SearchInputProps
    extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
    data: DataItem
    onCustomClick(
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
        item: DataItem
    ): void
}

export function SearchMapRes({
    data,
    onCustomClick,
    ...rest
}: SearchInputProps) {
    return (
        <Container
            onClick={e => {
                onCustomClick(e, data)
            }}
            {...rest}
        >
            <ImageWrapper>
                <img
                    src={(data.image as any).src || data.image}
                    alt={data.title}
                />
            </ImageWrapper>

            <AsideData>
                <h3>{data.title}</h3>
                {/* <p>{data.popupMessage}</p> */}
                <small>{data.address}</small>
            </AsideData>
        </Container>
    )
}
