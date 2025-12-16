import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Experience } from './components/canvas/Experience';
import { Interface } from './components/ui/Interface';
import { Modal } from './components/ui/Modal';

function App() {
  return (
    <>
      <Canvas shadows>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Interface />
      <Modal />
    </>
  );
}

export default App;
