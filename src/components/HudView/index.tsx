import { useEffect } from 'react'
import { Dispatch, SetStateAction, useState } from 'react'
import { Site3DViewHUD } from '../../shared/model/site.model'

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
    SiteData: Site3DViewHUD
}

// const SiteData = [
//     {
//         year: 2020,
//         preview_images: [
//             {
//                 url: '/360test/normal/casa.png',
//                 link: 0
//             },
//             {
//                 url: '/360test/normal/shangai_cut.png',
//                 link: 5
//             },
//             {
//                 url: '/360test/normal/museu_cut.png',
//                 link: 2
//             },
//             {
//                 url: '/360test/normal/porto_cut.png',
//                 link: 1
//             }
//         ],
//         active: true
//     },
//     {
//         year: 2010,
//         active: false
//     },
//     {
//         year: 2000,
//         active: false
//     },
//     {
//         year: 1990,
//         active: false
//     }
// ]

export function HudView({
    children,
    setPlace,
    activePlaceNumber,
    SiteData
}: HudProps) {
    const [likeNumber, setLikeNumber] = useState(SiteData.like)
    const [likeState, setLikeState] = useState(false)

    const [showInfo, setShowInfo] = useState(false)
    const [showPreviewImages, setShowPreviewImages] = useState(true)
    const [yearsObj, setYearsObj] = useState(() => {
        return SiteData.years.map(year => ({
            year,
            active: false
        }))
    })

    const [historyYears, setHistoryYears] = useState(SiteData)

    // useEffect(() => {
    //     console.log(SiteData)
    // }, [])

    // function handleYearChange(year: number) {
    //     setHistoryYears(prev => {
    //         return prev.map(item => ({
    //             ...item,
    //             active: item.year !== year ? false : true
    //         }))
    //     })
    // }

    function handleLikeIncrese() {
        setLikeState(prev => !prev)
        setLikeNumber(prev => (prev === SiteData.like ? prev + 1 : prev - 1))
    }

    return (
        <Container>
            <HeaderHUD>
                <HeaderHUDText>
                    <h2>{SiteData.name}</h2>
                    <small>{`${SiteData.address.streetAddress} - ${SiteData.address.city}, ${SiteData.address.city}, ${SiteData.address.uf}, ${SiteData.address.zipCode}`}</small>
                </HeaderHUDText>

                <HeaderHUDTools>
                    <button>
                        <StShareIcon />
                    </button>
                    <HeartLike isBottom>
                        <button onClick={handleLikeIncrese}>
                            {!likeState ? (
                                <StHeartOutIcon />
                            ) : (
                                <StHeartIcon style={{ color: 'red' }} />
                            )}
                        </button>
                        <span>{likeNumber}</span>
                    </HeartLike>
                </HeaderHUDTools>
            </HeaderHUD>

            <YearHUDContainer>
                <YearHUD>
                    <button>
                        <StArrowUpIcon />
                    </button>
                    <YearHUDOptContainer>
                        {yearsObj.map(yearOb => (
                            <YearHUDOpt
                                href={`/3d-view?idHistoricalSite=${SiteData.id}&year=${yearOb.year}`}
                                key={String(yearOb.year * 0.2)}
                                active={yearOb.active}
                            >
                                {yearOb.year}
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
                    {SiteData.preview_images.map(preview => (
                        <BottomHUDImageButton
                            key={preview.link + 1}
                            isActive={
                                activePlaceNumber === preview.link
                                    ? true
                                    : false
                            }
                            onClick={() => setPlace(preview.link)}
                        >
                            <img src={preview.image} alt="Image preview" />
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
                        <small>{SiteData.description}</small>
                    </div>

                    <div>
                        <h3>Local</h3>
                        <small>{`${SiteData.address.streetAddress} - ${SiteData.address.city}, ${SiteData.address.city}, ${SiteData.address.uf}, ${SiteData.address.zipCode}`}</small>
                    </div>

                    <HeartLike isBottom={false}>
                        <StHeartIcon style={{ color: 'red' }} />
                        <span>{likeNumber}</span>
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
