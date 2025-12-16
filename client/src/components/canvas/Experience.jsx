import { ScrollControls, PerspectiveCamera, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Hallway } from './Hallway';
import * as THREE from 'three';

const CameraRig = () => {
    const scroll = useScroll();

    useFrame((state) => {
        // Scroll.offset is 0 to 1
        // We want to move camera from Z=5 to Z = -Length
        // Let's say length is approx 70 units (6 items * 10 + buffer)
        const length = 70;
        const targetZ = 5 - (scroll.offset * length);

        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1);
    });

    return null;
}

export const Experience = () => {
    return (
        <>
            <color attach="background" args={['#050202']} />

            {/* Lights */}
            <ambientLight intensity={0.2} />
            {/* Follow light */}
            <spotLight position={[0, 10, 5]} angle={0.5} penumbra={1} intensity={1} castShadow />

            <fog attach="fog" args={['#050202', 5, 25]} />

            <ScrollControls pages={6} damping={0.3}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                <CameraRig />
                <Hallway />
            </ScrollControls>
        </>
    );
};
