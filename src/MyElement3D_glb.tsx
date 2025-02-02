import {
    Environment,
    OrbitControls,
    useAnimations,
    useGLTF,
} from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

function MyElement3D() {
    const model = useGLTF('./model.glb');
    const [height, setHeight] = useState(0);
    const animations = useAnimations(model.animations, model.scene);
    const { actionName } = useControls({
        actionName: {
            value: animations.names[1],
            options: animations.names,
        },
    });

    useEffect(() => {
        const action = animations.actions[actionName];
        action?.reset().fadeIn(0.5).play();
        return () => {
            action?.fadeOut(0.5);
        };
    }, [actionName]);

    useEffect(() => {
        let minY = Infinity,
            maxY = -Infinity;
        model.scene.traverse((item) => {
            if (item instanceof THREE.Mesh) {
                // isMesh 대신 instanceof THREE.Mesh 사용
                const geometry = item.geometry;
                geometry.computeBoundingBox();
                const geomBbox = geometry.boundingBox;
                if (minY > geomBbox.min.y) minY = geomBbox.min.y;
                if (maxY < geomBbox.max.y) maxY = geomBbox.max.y;
            }
        });

        const h = maxY - minY;
        setHeight(h);
    }, [model.scene]);
    return (
        <>
            <OrbitControls />
            <Environment preset="sunset" />
            <primitive
                object={model.scene}
                position-y={-(height / 2) * 5}
                scale={5}
            />
        </>
    );
}

export default MyElement3D;
