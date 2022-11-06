import { Dispatch, SetStateAction, useState } from 'react'

import {
    Container,
    HeartLike,
    HeaderHUD,
    HeaderHUDText,
    HeaderHUDTools,
    YearHUDContainer,
    YearHUDOptContainer,
    YearHUD,
    YearHUDOpt,
    BottomHUDContainer,
    BottomHUDShowButton,
    BottomHUDInfoButton,
    BottomHUDImageButton,
    BottomHUDInfoButtonTooltip,
    BottomHUDImage,
    StHeartOutIcon,
    StHeartIcon,
    StShareIcon,
    StArrowUpIcon,
    StArrowDownIcon,
    StInfoIcon
} from './styles'

interface HudProps {
    children: React.ReactNode
    setPlace: Dispatch<SetStateAction<number>>
    activePlaceNumber: number
}

const SiteData = [
    {
        year: 2020,
        preview_images: [
            {
                url: '/360test/normal/casa.png',
                link: 0
            },
            {
                url: '/360test/normal/shangai_cut.png',
                link: 5
            },
            {
                url: '/360test/normal/museu_cut.png',
                link: 2
            },
            {
                url: '/360test/normal/porto_cut.png',
                link: 1
            }
        ],
        active: true
    },
    {
        year: 2010,
        active: false
    },
    {
        year: 2000,
        active: false
    },
    {
        year: 1990,
        active: false
    }
]

export function HudView({ children, setPlace, activePlaceNumber }: HudProps) {
    const [likeState, setLikeState] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [showPreviewImages, setShowPreviewImages] = useState(true)

    const [historyYears, setHistoryYears] = useState(SiteData)

    function handleYearChange(year: number) {
        setHistoryYears(prev => {
            return prev.map(item => ({
                ...item,
                active: item.year !== year ? false : true
            }))
        })
    }

    return (
        <Container>
            <HeaderHUD>
                <HeaderHUDText>
                    <h2>Catedral Metropolitana de Brasília</h2>
                    <small>Lote 12 - Brasília, DF, 70050-000</small>
                </HeaderHUDText>

                <HeaderHUDTools>
                    <button>
                        <StShareIcon />
                    </button>
                    <HeartLike isBottom>
                        <button onClick={() => setLikeState(prev => !prev)}>
                            {!likeState ? (
                                <StHeartOutIcon />
                            ) : (
                                <StHeartIcon style={{ color: 'red' }} />
                            )}
                        </button>
                        <span>1</span>
                    </HeartLike>
                </HeaderHUDTools>
            </HeaderHUD>

            <YearHUDContainer>
                <YearHUD>
                    <button>
                        <StArrowUpIcon />
                    </button>
                    <YearHUDOptContainer>
                        {historyYears.map(site => (
                            <YearHUDOpt
                                key={String(site.year)}
                                onClick={() => handleYearChange(site.year)}
                                active={site.active}
                            >
                                {site.year}
                            </YearHUDOpt>
                        ))}
                    </YearHUDOptContainer>
                    <button>
                        <StArrowDownIcon />
                    </button>
                </YearHUD>
            </YearHUDContainer>

            {children}

            <BottomHUDContainer bottomVisible={showPreviewImages}>
                <BottomHUDShowButton
                    onClick={() => setShowPreviewImages(prev => !prev)}
                >
                    {showPreviewImages ? (
                        <StArrowDownIcon
                            style={{
                                width: '5.2rem',
                                height: '5.2rem'
                            }}
                        />
                    ) : (
                        <StArrowUpIcon
                            style={{
                                width: '5.2rem',
                                height: '5.2rem'
                            }}
                        />
                    )}
                </BottomHUDShowButton>
                <BottomHUDImage>
                    {historyYears[0].preview_images.map(preview => (
                        <BottomHUDImageButton
                            key={preview.url}
                            isActive={
                                activePlaceNumber === preview.link
                                    ? true
                                    : false
                            }
                            onClick={() => setPlace(preview.link)}
                        >
                            <img
                                key={preview.url}
                                src={preview.url}
                                alt="Porto"
                            />
                        </BottomHUDImageButton>
                    ))}
                </BottomHUDImage>

                {/* <div style={{ position: 'relative' }}> */}
                <BottomHUDInfoButtonTooltip
                    show={showInfo}
                    bottomVisible={showPreviewImages}
                >
                    <div>
                        <h3>Descrição do Sítio</h3>
                        <small>
                            A Catedral Metropolitana - Nossa Senhora Aparecida,
                            mais conhecida como Catedral de Brasília, é um
                            templo católico brasileiro, na qual se encontra a
                            cátedra da Arquidiocese de Brasília, localizada na
                            capital federal, ao sul da S1, no Eixo Monumental,
                            região da Esplanada dos Ministérios.
                        </small>
                    </div>

                    <div>
                        <h3>Local</h3>
                        <small>Lote 12 - Brasília, DF, 70050-000</small>
                    </div>

                    <HeartLike isBottom={false}>
                        <StHeartIcon style={{ color: 'red' }} />
                        <span>1</span>
                    </HeartLike>
                </BottomHUDInfoButtonTooltip>
                {/* </div> */}

                <BottomHUDInfoButton
                    bottomVisible={showPreviewImages}
                    onClick={() => setShowInfo(prev => !prev)}
                >
                    <StInfoIcon />
                </BottomHUDInfoButton>
            </BottomHUDContainer>
        </Container>
    )
}
