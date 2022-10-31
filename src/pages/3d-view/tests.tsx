import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
    OrbitControls,
    Stars,
    softShadows,
    MeshWobbleMaterial
} from '@react-three/drei'

import { Container } from '../../styles/pages/3d'
import Head from '../../infra/components/Head'

softShadows()

function Box(props: JSX.IntrinsicElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>()
    useFrame(
        (state, delta) =>
            (meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01)
    )

    return (
        <mesh castShadow ref={meshRef} {...props}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <MeshWobbleMaterial
                attach="material"
                color="hotpink"
                speed={2}
                factor={1}
                skinning
            />
        </mesh>
    )
}

function ThreeDView() {
    return (
        <Container>
            <Head title="3DTestes" />
            <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[-10, 0, -20]} intensity={0.5} />
                <pointLight position={[0, -10, 0]} intensity={1.5} />
                <directionalLight
                    castShadow
                    position={[0, 10, 0]}
                    intensity={1}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />

                <group>
                    <mesh
                        receiveShadow
                        position={[0, -3, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    >
                        <planeBufferGeometry
                            attach="geometry"
                            args={[100, 100]}
                        />
                        <shadowMaterial
                            attach="material"
                            color="white"
                            opacity={0.3}
                        />
                    </mesh>
                </group>

                <Box position={[-4, 0, -4]} />
                <Box />
                <Box position={[4, 0, -4]} />
                <Stars />
                <OrbitControls />
            </Canvas>
        </Container>
    )
}

export default ThreeDView
