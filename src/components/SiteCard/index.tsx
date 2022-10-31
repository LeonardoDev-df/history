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
import { HistoricalSiteProps, SiteStatus } from '../../shared/model/site.model'
import { HTMLAttributes } from 'react'

const FlagType = {
    EM_ANALISE: <StatusFlag colorType="blue">Em análise</StatusFlag>,
    NEGADO: <StatusFlag colorType="red">Negado</StatusFlag>,
    ACEITO: <StatusFlag colorType="green">Aceito</StatusFlag>
}

interface SiteCardProps extends HTMLAttributes<HTMLDivElement> {
    status: SiteStatus
    siteData: HistoricalSiteProps
}

export function SiteCard({ status, siteData, ...rest }: SiteCardProps) {
    const {
        siteImages,
        name,
        address: { streetAddress, zipCode }
    } = siteData

    return (
        <Container {...rest}>
            <StImage
                src={`data:image/jpeg;base64,${siteImages[0].imagePreview}`}
                alt="Foto do sítio"
                height={250}
                width={500}
            />

            <CardContent>
                <h2>{name}</h2>
                <div style={{ marginTop: '1.4rem' }}>
                    <StLocationOn />
                    <small>{`${streetAddress}, ${zipCode}`}</small>
                </div>

                {FlagType[status]}
            </CardContent>
        </Container>
    )
}
