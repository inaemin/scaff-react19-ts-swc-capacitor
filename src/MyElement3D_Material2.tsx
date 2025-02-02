import { OrbitControls, useTexture } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function MyElement3D() {
    const textures = useTexture({
        map: './glass/Glass_Window_002_basecolor.jpg',
        roughnessMap: './glass/Glass_Window_002_roughness.jpg',
        metalnessMap: './glass/Glass_Window_002_metallic.jpg',
        normalMap: './glass/Glass_Window_002_normal.jpg',
        displacementMap: './glass/Glass_Window_002_height.png',
        aoMap: './glass/Glass_Window_002_ambientOcclusion.jpg',
        alphaMap: './glass/Glass_Window_002_opacity.jpg',
    });

    const mesh = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (mesh.current) {
            textures.map.repeat.x =
                textures.displacementMap.repeat.x =
                textures.aoMap.repeat.x =
                textures.metalnessMap.repeat.x =
                textures.roughnessMap.repeat.x =
                textures.normalMap.repeat.x =
                textures.alphaMap.repeat.x =
                    4;

            textures.map.wrapS =
                textures.displacementMap.wrapS =
                textures.aoMap.wrapS =
                textures.metalnessMap.wrapS =
                textures.roughnessMap.wrapS =
                textures.normalMap.wrapS =
                textures.alphaMap.wrapS =
                    THREE.MirroredRepeatWrapping;

            textures.alphaMap.needsUpdate = true;

            mesh.current.geometry.setAttribute(
                'uv2',
                new THREE.BufferAttribute(
                    mesh.current.geometry.attributes.uv.array,
                    2
                )
            );
        }
    }, []);

    return (
        <>
            <OrbitControls />
            <ambientLight intensity={1} />
            <directionalLight position={[0, 1, -8]} intensity={0.4} />
            <directionalLight position={[1, 2, 8]} intensity={0.4} />

            <mesh ref={mesh}>
                <cylinderGeometry args={[2, 2, 3, 256, 256, true]} />
                <meshStandardMaterial
                    wireframe={false}
                    side={THREE.DoubleSide}
                    map={textures.map}
                    roughnessMap={textures.roughnessMap}
                    roughnessMap-colorSpace={THREE.NoColorSpace}
                    metalnessMap={textures.metalnessMap}
                    metalness={0.5}
                    metalnessMap-colorSpace={THREE.NoColorSpace}
                    normalMap={textures.normalMap}
                    normalMap-colorSpace={THREE.NoColorSpace}
                    normalScale={1}
                    displacementMap={textures.displacementMap}
                    displacementMap-colorSpace={THREE.NoColorSpace}
                    displacementScale={0.2}
                    displacementBias={-0.2}
                    aoMap={textures.aoMap}
                    alphaMap={textures.alphaMap}
                    transparent
                    alphaToCoverage
                />
            </mesh>
        </>
    );
}

export default MyElement3D;
