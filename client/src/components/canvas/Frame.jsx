import { useRef, useState } from 'react';
import { useCursor } from '@react-three/drei';
import { useStore } from '../../stores/useStore';
import * as THREE from 'three';

export const Frame = ({ position, rotation, data }) => {
    const mesh = useRef();
    const [hovered, setHover] = useState(false);

    // Change cursor on hover
    useCursor(hovered);

    const openModal = useStore((state) => state.openModal);

    return (
        <group position={position} rotation={rotation}>
            {/* Frame Structure */}
            <mesh
                ref={mesh}
                onClick={(e) => {
                    e.stopPropagation();
                    openModal(data);
                }}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                scale={hovered ? 1.05 : 1}
            >
                {/* Outer Frame */}
                <boxGeometry args={[3, 4, 0.2]} />
                <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Inner Canvas (Placeholder Color) */}
            <mesh position={[0, 0, 0.11]}>
                <planeGeometry args={[2.6, 3.6]} />
                <meshBasicMaterial color={data.color} />
            </mesh>

            {/* Label Title */}
            {/* Use simple text or just rely on the visual for now, adding Text later to avoid font loading complexity in MVP step 1 */}
        </group>
    );
};
