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
import * as THREE from 'three'

import { Container } from '../../styles/pages/3d'
import { HudView } from '../../components/HudView'
import Head from '../../infra/components/Head'

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

// Imagens panôramicas !== imagens 360
// Resolução boas: 2048x1024
const places: PlaceType[] = [
    {
        linkedPlace: 1,
        color: 'white',
        position: [12, 0, -16],
        url: '/360test/test_pano.jpg'
    },
    {
        linkedPlace: 2,
        color: 'white',
        position: [-16, 0, -16],
        url: '/360test/porto.jpg'
    },
    {
        linkedPlace: 3,
        color: 'red',
        position: [32, 0, 16],
        url: '/360test/museu.jpg'
    },
    {
        linkedPlace: 4,
        color: 'black',
        position: [24, 0, 0],
        url: '/360test/sala-maluca.jpg'
    },
    {
        linkedPlace: 5,
        color: 'white',
        position: [0, 0, -16],
        url: '/360test/salao.jpg'
    },
    {
        linkedPlace: 0,
        color: 'white',
        position: [-4, 0, 16],
        url: '/360test/shangai.jpg'
    }
]

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
                <meshBasicMaterial attach="material" color={color} transparent opacity={0.5} />
            </mesh>
        </group>
    )
}

function Portals({
    placeNumber,
    setPlaceNumber
}: {
    placeNumber: number
    setPlaceNumber: Dispatch<SetStateAction<number>>
}) {
    const { color, position, linkedPlace } = places[placeNumber]
    const textures = useLoader(
        THREE.TextureLoader,
        places.map(place => place.url)
    )
    return (
        <Dome
            color={color}
            buttonPosition={position}
            texture={textures[placeNumber]}
            onClick={() => setPlaceNumber(linkedPlace)}
        />
    )
}

function Preload() {
    // This component pre-loads textures in order to lessen loading impact when clicking portals
    const { gl } = useThree()
    const maps = useLoader(
        THREE.TextureLoader,
        places.map(place => place.url)
    )
    useEffect(() => maps.forEach(gl.initTexture), [maps, gl.initTexture])
    return null
}

function ThreeDView() {
    const [placeNumber, setPlaceNumber] = useState(0)

    return (
        <Container>
            <Head title="3D View" />

            <HudView setPlace={setPlaceNumber} activePlaceNumber={placeNumber}>
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
                        <Preload />
                        <Portals
                            placeNumber={placeNumber}
                            setPlaceNumber={setPlaceNumber}
                        />
                    </Suspense>
                </Canvas>
            </HudView>
        </Container>
    )
}

export default ThreeDView
