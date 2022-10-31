import { Canvas, ThreeEvent, useLoader, useThree } from '@react-three/fiber'
import {
    Suspense,
    useRef,
    useState,
    useEffect,
    Dispatch,
    SetStateAction
} from 'react'
import { OrbitControls } from '@react-three/drei'
import { useRouter } from 'next/router'
import * as THREE from 'three'
import axios from 'axios'

import { SiteImage3DView } from '../../shared/model/site.model'
import { asyncHandler } from '../../utils/asyncHandler'
import { isArrayEmpty } from '../../utils/isItEmpty'
import { HudView } from '../../components/HudView'
import { Container } from '../../styles/pages/3d'
import Head from '../../infra/components/Head'
import { GetServerSideProps } from 'next'

interface PlaceType {
    linkedPlace: number
    color: string
    position: [number, number, number]
    url: string
}

interface DomeProps {
    color: string
    buttonPosition: [number, number, number]
    texture: THREE.Texture
    onClick: (event: ThreeEvent<MouseEvent>) => void
}

function Dome({ color, buttonPosition: bp, texture, onClick }: DomeProps) {
    const pointRef = useRef<THREE.Mesh>()
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
        return null
    }, [hovered])

    const vectorPosition = new THREE.Vector3(bp[0], bp[1], bp[2])

    return (
        <group>
            <mesh>
                {/* args={[500, 60, 40] */}
                <sphereBufferGeometry
                    attach="geometry"
                    args={[500, 320, 320]}
                />
                <meshBasicMaterial
                    attach="material"
                    map={texture}
                    side={THREE.BackSide}
                />
            </mesh>

            <mesh
                ref={pointRef}
                position={vectorPosition}
                scale={hovered ? [1.25, 1.25, 1.25] : [1, 1, 1]}
                onClick={onClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry attach="geometry" args={[1, 30, 30]} />
                <meshBasicMaterial
                    attach="material"
                    color={color}
                    transparent
                    opacity={0.5}
                />
            </mesh>
        </group>
    )
}

function Portals({
    placeNumber,
    setPlaceNumber,
    places
}: {
    placeNumber: number
    setPlaceNumber: Dispatch<SetStateAction<number>>
    places: SiteImage3DView[]
}) {
    const { buttonColor, buttonPosition, numberImage = 0 } = places[placeNumber]
    const textures = useLoader(
        THREE.TextureLoader,
        places.map(place => place.image3D)
    )
    return (
        <Dome
            color={buttonColor}
            buttonPosition={buttonPosition}
            texture={textures[placeNumber]}
            onClick={() => setPlaceNumber(numberImage)}
        />
    )
}

function Preload({ places }: { places: SiteImage3DView[] }) {
    // This component pre-loads textures in order to lessen loading impact when clicking portals
    const { gl } = useThree()
    const maps = useLoader(
        THREE.TextureLoader,
        places.map(place => place.image3D)
    )
    useEffect(() => maps.forEach(gl.initTexture), [maps, gl.initTexture])
    return null
}

function ThreeDView({
    idHistoricalSite,
    year
}: {
    idHistoricalSite: number
    year: number
}) {
    const [placeNumber, setPlaceNumber] = useState(0)
    const [historicalSitePlaces, setHistoricalSitePlaces] = useState(
        [] as SiteImage3DView[]
    )
    const [historicalSiteInfo, setHistoricalSiteInfo] = useState<any>()

    useEffect(() => {
        async function getHistoricalSiteImages() {
            const [response, error] = await asyncHandler(
                axios.get(
                    `https://rv-history-api.herokuapp.com/api/site-images/${idHistoricalSite}/${year}`
                )
            )

            if (error) {
                // handling error
                return
            }

            const handledResponse = response.data.map((item, index) => {
                const {
                    numberImage,
                    // buttonPosition: { x, y, z },
                    image3D,
                    imagePreview
                    // year
                } = item

                return {
                    numberImage:
                        numberImage || index === response.data.length - 1
                            ? 0
                            : index + 1,
                    buttonColor: 'white',
                    buttonPosition: [12, 0, -16],
                    image3D: `data:image/jpeg;base64,${image3D}`,
                    imagePreview: `data:image/jpeg;base64,${imagePreview}`
                    // year: year || 2021
                }
            })

            setHistoricalSitePlaces(handledResponse)
        }

        getHistoricalSiteImages()
    }, [])

    useEffect(() => {
        async function getHistoricalSiteInfo() {
            const [response, error] = await asyncHandler(
                axios.get(
                    `/api/historical-sites/get-id?idHistoricalSite=${idHistoricalSite}`
                )
            )

            if (error) {
                // handling error
                return
            }

            const {
                id,
                name,
                description,
                years,
                address: { streetAddress, city, uf, zipCode },
                like
            } = response.data

            const handledSiteInfoRes = {
                id,
                name,
                like: like || 0,
                description,
                years: years || [2021],
                address: {
                    streetAddress,
                    city,
                    uf,
                    zipCode
                }
            }

            setHistoricalSiteInfo(handledSiteInfoRes)
        }

        getHistoricalSiteInfo()
    }, [])

    const handledPlaces = historicalSitePlaces.map(item => ({
        image: item.imagePreview,
        link: item.numberImage
    }))

    if (
        !historicalSitePlaces ||
        isArrayEmpty(historicalSitePlaces) ||
        !historicalSiteInfo
    ) {
        return (
            <Container>
                <Head title="Carregando..." />
                Loading...
            </Container>
        )
    }

    return (
        <Container>
            <Head
                title={`Visão 3D ${historicalSiteInfo.name
                    .substring(0, 10)
                    .trim()}`}
            />

            <HudView
                SiteData={{
                    ...historicalSiteInfo,
                    preview_images: handledPlaces
                }}
                setPlace={setPlaceNumber}
                activePlaceNumber={placeNumber}
            >
                <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableDamping
                        dampingFactor={0.05}
                        autoRotate={false}
                        rotateSpeed={-0.42}
                    />
                    <Suspense fallback={'Loading pano...'}>
                        <Preload places={historicalSitePlaces} />
                        <Portals
                            places={historicalSitePlaces}
                            placeNumber={placeNumber}
                            setPlaceNumber={setPlaceNumber}
                        />
                    </Suspense>
                </Canvas>
            </HudView>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const {
        query: { idHistoricalSite, year }
    } = ctx

    return {
        props: {
            idHistoricalSite,
            year
        }
    }
}

// export const getServerSideProps: GetServerSideProps = async ctx => {
//     const api = getAPIClient(ctx)

//     const {
//         query: { idHistoricalSite, year }
//     } = ctx

//     const [placesResponse, placesError] = await asyncHandler(
//         api.get(`/api/site-images/${idHistoricalSite}/${year}`)
//     )
//     const [siteInfoResponse, error] = await asyncHandler(
//         api.get(`/api/historical-sites/${idHistoricalSite}`)
//     )

//     if (error || placesError) {
//         return {
//             notFound: true
//         }
//     }

//     const handledResponse = placesResponse.data.map((item, index) => {
//         const {
//             numberImage,
//             // buttonPosition: { x, y, z },
//             image3D,
//             imagePreview
//             // year
//         } = item

//         return {
//             numberImage:
//                 numberImage || index === placesResponse.data.length - 1
//                     ? 0
//                     : index + 1,
//             buttonColor: 'white',
//             buttonPosition: [12, 0, -16],
//             image3D: `data:image/jpeg;base64,${image3D}`,
//             imagePreview: `data:image/jpeg;base64,${imagePreview}`
//             // year: year || 2021
//         }
//     })

//     const {
//         id,
//         name,
//         description,
//         years: siteInfoYear,
//         address: { streetAddress, city, uf, zipCode },
//         like
//     } = siteInfoResponse.data

//     const handledSiteInfoRes = {
//         id,
//         name,
//         like: like || 0,
//         description,
//         years: siteInfoYear || [2021],
//         address: {
//             streetAddress,
//             city,
//             uf,
//             zipCode
//         }
//     }

//     return {
//         props: {
//             historicalSitePlaces: handledResponse,
//             historicalSiteInfo: handledSiteInfoRes
//         }
//     }
// }

export default ThreeDView
