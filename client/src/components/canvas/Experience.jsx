import { ScrollControls, PerspectiveCamera, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Hallway } from './Hallway';
import { useStore } from '../../stores/useStore';
import { useEffect } from 'react';
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
    const fetchExhibits = useStore((state) => state.fetchExhibits);
    const mode = useStore((state) => state.mode);

    useEffect(() => {
        fetchExhibits();
    }, [mode]);

    const isAttic = mode === 'attic';
    const bgColor = isAttic ? '#1a1005' : '#050202';
    const fogColor = isAttic ? '#1a1005' : '#050202';

    return (
        <>
            <color attach="background" args={[bgColor]} />

            {/* Lights */}
            <ambientLight intensity={isAttic ? 0.4 : 0.2} />
            <spotLight position={[0, 10, 5]} angle={0.5} penumbra={1} intensity={1} castShadow />

            <fog attach="fog" args={[fogColor, 5, 25]} />

            <ScrollControls pages={6} damping={0.3}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                <CameraRig />
                <Hallway />
            </ScrollControls>
        </>
    );
};
