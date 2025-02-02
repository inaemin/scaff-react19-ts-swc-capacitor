import { OrbitControls, useTexture } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Mesh } from 'three';

function MyElement3D() {
    const mesh1 = useRef<Mesh>(null);
    const mesh2 = useRef<Mesh>(null);
    const matcap = useTexture('./matcap.jpg');

    useEffect(() => {
        if (mesh1.current && mesh2.current) {
            mesh2.current.material = mesh1.current.material;
        }
    }, []);

    return (
        <>
            <OrbitControls />
            {/* <ambientLight intensity={1} />
            <directionalLight position={[0, 1, 0]} />
            <directionalLight position={[1, 2, 8]} intensity={1} /> */}
            <mesh ref={mesh1} position={[0.7, 0, 0]}>
                <torusKnotGeometry args={[0.5, 0.15, 256, 128]} />
                <meshToonMaterial />
            </mesh>
            <mesh ref={mesh2} position={[-0.7, 0, 0]}>
                <torusGeometry args={[0.5, 0.2]} />
            </mesh>
        </>
    );
}

export default MyElement3D;
