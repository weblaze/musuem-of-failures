import { useRef } from 'react';
import { Frame } from './Frame';
import { useStore } from '../../stores/useStore';

export const Hallway = () => {
    const failures = useStore((state) => state.exhibits);
    const mode = useStore((state) => state.mode);
    const isAttic = mode === 'attic';

    // Length of the hallway based on number of items
    // Spacing items 10 units apart
    const spacing = 10;
    // Ensure length is at least enough for typical usage, even if empty
    const length = Math.max(failures.length, 5) * spacing + 20;

    const floorColor = isAttic ? '#2a1a0f' : '#1a0b0b';
    const ceilingColor = isAttic ? '#2a1a0f' : '#2d1b1b';
    const wallColor = isAttic ? '#4a3b2a' : '#4a0404';

    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, -length / 2]}>
                <planeGeometry args={[10, length]} />
                <meshStandardMaterial color={floorColor} roughness={0.8} />
            </mesh>

            {/* Ceiling */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, -length / 2]}>
                <planeGeometry args={[10, length]} />
                <meshStandardMaterial color={ceilingColor} />
            </mesh>

            {/* Left Wall */}
            <mesh position={[-5, 1.5, -length / 2]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[length, 9]} />
                <meshStandardMaterial color={wallColor} />
            </mesh>

            {/* Right Wall */}
            <mesh position={[5, 1.5, -length / 2]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[length, 9]} />
                <meshStandardMaterial color={wallColor} />
            </mesh>

            {/* Items */}
            {failures.map((item, index) => {
                const z = -index * spacing - 10;
                const isLeft = index % 2 === 0;
                const x = isLeft ? -4.8 : 4.8;
                const rotY = isLeft ? Math.PI / 6 : -Math.PI / 6; // Slight angle towards viewer

                return (
                    <Frame
                        key={item.id}
                        data={item}
                        position={[x, 0, z]}
                        rotation={[0, rotY, 0]}
                    />
                );
            })}
        </group>
    );
};
