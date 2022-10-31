import Image from 'next/image'

import {
    Container,
    StImage,
    ImageWrapper,
    CardContent,
    StatusFlag,
    StLocationOn
} from './styles'
import SiteImage from '../../assets/site-image.jpg'
import { SiteProps } from '../../shared/model/user.model'
import { HTMLAttributes } from 'react'

const FlagType = {
    denied: () => <StatusFlag colorType="red">Negado</StatusFlag>,
    underReview: () => <StatusFlag colorType="blue">Em análise</StatusFlag>,
    accepted: () => <StatusFlag colorType="green">Aceito</StatusFlag>
}

interface SiteCardProps extends HTMLAttributes<HTMLDivElement> {
    status: 'denied' | 'underReview' | 'accepted'
    siteData: SiteProps
}

export function SiteCard({ status, siteData, ...rest }: SiteCardProps) {
    const { image, title, address } = siteData

    return (
        <Container {...rest}>
            <StImage
                src={image}
                alt="Foto do sítio"
                placeholder="blur"
                height={250}
                width={500}
            />

            <CardContent>
                <h2>{title}</h2>
                <div style={{ marginTop: '1.4rem' }}>
                    <StLocationOn />
                    <small>{address}</small>
                </div>

                {FlagType[status]()}
            </CardContent>
        </Container>
    )
}
