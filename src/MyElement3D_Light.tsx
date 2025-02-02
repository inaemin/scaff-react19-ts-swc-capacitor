import { Environment } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
    color: '#9b59b6',
    roughness: 0.5,
    metalness: 0.9,
});

function MyElement3D() {
    useFrame((state) => {
        const time = state.clock.elapsedTime;
        const smallSpherePivot =
            state.scene.getObjectByName('smallSpherePivot');
        smallSpherePivot!.rotation.y = THREE.MathUtils.degToRad(time * 50);

        const target = new THREE.Vector3();
        smallSpherePivot?.children[0].getWorldPosition(target);
        state.camera.position.copy(target);

        const ghostSpherePivot =
            state.scene.getObjectByName('ghostSpherePivot');
        ghostSpherePivot!.rotation.y = THREE.MathUtils.degToRad(time * 50 + 30);
        ghostSpherePivot?.children[0].getWorldPosition(target);
        state.camera.lookAt(target);
    });

    const light = useRef<THREE.DirectionalLight>(null);

    const { camera } = useThree();

    return (
        <>
            <Environment files={'./venice_sunrise_4k.hdr'} background />

            <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial
                    color="#2c3e50"
                    roughness={0.5}
                    metalness={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
                <sphereGeometry args={[1.5, 64, 64, 0, Math.PI]} />
                <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.2}
                />
            </mesh>

            {new Array(8).fill(0).map((_, index) => {
                return (
                    <group
                        key={index}
                        rotation-y={THREE.MathUtils.degToRad(45 * index)}>
                        <mesh
                            geometry={torusGeometry}
                            material={torusMaterial}
                            position={[3, 0.5, 0]}
                        />
                    </group>
                );
            })}

            <group name="smallSpherePivot">
                <mesh position={[3, 0.5, 0]}>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshStandardMaterial
                        color="#e74c3c"
                        roughness={0.2}
                        metalness={0.5}
                    />
                </mesh>
            </group>

            <group name="ghostSpherePivot">
                <object3D position={[3, 0.5, 0]} />
            </group>
        </>
    );
}

export default MyElement3D;
