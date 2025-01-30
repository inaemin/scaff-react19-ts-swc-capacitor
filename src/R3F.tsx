import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

function R3F() {
    return (
        <div className="p-4">
            <h1>R3F</h1>
            <div style={{ width: '100vw', height: '100vh' }}>
                <Canvas></Canvas>
            </div>
        </div>
    );
}

export default R3F;
