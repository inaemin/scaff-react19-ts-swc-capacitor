import { Canvas } from '@react-three/fiber';
import MyElement3D from './MyElement3D';

function R3F() {
    return (
        <div className="p-4 bg-black">
            <h1>R3F</h1>
            <div style={{ width: '100vw', height: '100vh' }}>
                <Canvas
                    camera={{
                        fov: 100,
                        near: 0.2,
                        far: 200,
                    }}>
                    <MyElement3D />
                </Canvas>
            </div>
        </div>
    );
}

export default R3F;
