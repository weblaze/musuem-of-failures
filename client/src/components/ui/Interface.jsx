import { motion } from 'framer-motion';
import { useStore } from '../../stores/useStore';

export const Interface = () => {
    const modalOpen = useStore((state) => state.modalOpen);

    return (
        <div className={`absolute inset-0 pointer-events-none ${modalOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
            <div className="absolute top-8 left-8">
                <h1 className="text-2xl font-serif text-white tracking-widest uppercase">
                    Museum of <span className="text-red-600">Failures</span>
                </h1>
            </div>

            <div className="absolute bottom-12 w-full text-center">
                <motion.p
                    animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-zinc-500 font-sans text-sm tracking-widest uppercase"
                >
                    Scroll to Explore
                </motion.p>
            </div>
        </div>
    );
};
