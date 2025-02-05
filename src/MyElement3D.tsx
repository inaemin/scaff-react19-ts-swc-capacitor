import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import fragmentShader from './lib/fragmentShader.glsl?raw';
import vertexShader from './lib/vertexShader.glsl?raw';

const COUNT = 100;
const generatePos = () => {
    return (Math.random() - 0.5) * 10;
};
const CHROMATIC_ABBERATION_OFFSET = 0.007;

function MyElement3D() {
    const particles = useRef<THREE.Points>(null);
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // 초기화
    useEffect(() => {
        const tempColor = new THREE.Color();

        for (let i = 0; i < COUNT; i++) {
            positions[i * 3] = generatePos();
            positions[i * 3 + 1] = generatePos();
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            tempColor.setHSL(Math.random(), 0.6, 0.6 + Math.random() * 0.3);
            colors[i * 3] = tempColor.r;
            colors[i * 3 + 1] = tempColor.g;
            colors[i * 3 + 2] = tempColor.b;

            scales[i] = 1;
        }
    }, []);

    useFrame((state, delta) => {
        if (!particles.current) return;

        const positions = particles.current.geometry.attributes.position.array;
        const timeFactor = Math.pow(0.5, state.clock.elapsedTime);

        // 각 입자의 Z 위치 업데이트
        for (let i = 0; i < COUNT; i++) {
            const idx = i * 3 + 2; // [x, y, z] 중 Z 인덱스

            if (positions[idx] > 7.0) {
                positions[idx] = -4.0; // 리셋
            } else {
                positions[idx] += Math.max(
                    delta * 2.0, // delta 기반 이동
                    timeFactor * 0.5 // 시간 감쇠 이동
                );
            }
        }

        // 업데이트 플래그 설정
        particles.current.geometry.attributes.position.needsUpdate = true;

        // 셰이더 유니폼 업데이트
        if (!materialRef.current) return;
        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        materialRef.current.uniforms.uChromaticPower.value =
            timeFactor * CHROMATIC_ABBERATION_OFFSET;
    });

    return (
        <instancedMesh ref={particles} args={[undefined, undefined, COUNT]}>
            <bufferGeometry>
                {/* 위치 버퍼 속성 */}
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]} // THREE.BufferAttribute(positions, 3)
                    count={COUNT}
                />

                {/* 색상 버퍼 속성 */}
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                    count={COUNT}
                />

                {/* 스케일 버퍼 속성 */}
                <bufferAttribute
                    attach="attributes-aScale"
                    args={[scales, 1]}
                    count={COUNT}
                />
            </bufferGeometry>

            {/* 커스텀 셰이더 머티리얼 */}
            <shaderMaterial
                ref={materialRef}
                uniforms={{
                    uTime: { value: 0 },
                    uChromaticPower: { value: 0 },
                }}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={false}
                blending={THREE.AdditiveBlending}
                glslVersion={THREE.GLSL3} // 필수 항목
            />
        </instancedMesh>
    );
}

export default MyElement3D;
