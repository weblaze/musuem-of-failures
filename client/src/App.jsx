import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Experience } from './components/canvas/Experience';
import { Interface } from './components/ui/Interface';
import { Modal } from './components/ui/Modal';
import { AuthModal } from './components/ui/AuthModal';

import { SubmitModal } from './components/ui/SubmitModal';
import { useState, useEffect } from 'react';

function App() {
  const [submitOpen, setSubmitOpen] = useState(false);

  useEffect(() => {
    const open = () => setSubmitOpen(true);
    document.addEventListener('openSubmitModal', open);
    return () => document.removeEventListener('openSubmitModal', open);
  }, []);

  return (
    <>
      <Canvas shadows>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Interface />
      <Modal />
      <AuthModal />
      <SubmitModal isOpen={submitOpen} onClose={() => setSubmitOpen(false)} />
    </>
  );
}

export default App;
