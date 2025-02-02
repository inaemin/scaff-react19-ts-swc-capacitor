import { ContactShadows, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
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
        smallSpherePivot!.rotation.y = THREE.MathUtils.degToRad(time * 10);
    });

    return (
        <>
            <OrbitControls />

            <ambientLight intensity={1} />
            <directionalLight
                color="#ffffff"
                intensity={10}
                position={[0, 5, 0]}
            />

            <ContactShadows
                position={[0, 0, 0]}
                scale={10}
                resolution={512}
                color="#000000"
                opacity={0.4}
                blur={0.5}
            />

            {/* <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial
                    color="#2c3e50"
                    roughness={0.5}
                    metalness={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh> */}

            <mesh position-y={1.7}>
                <torusKnotGeometry args={[1, 0.2, 128, 32]} />
                <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.2}
                />
            </mesh>

            {new Array(10).fill(0).map((_, index) => {
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
        </>
    );
}

export default MyElement3D;
