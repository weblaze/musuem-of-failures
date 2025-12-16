import { useStore } from '../../stores/useStore';
import { AnimatePresence, motion } from 'framer-motion';

export const Modal = () => {
    const { modalOpen, activeItem, closeModal } = useStore();

    return (
        <AnimatePresence>
            {modalOpen && activeItem && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={closeModal}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-zinc-900 border border-gold/30 p-8 max-w-2xl w-full rounded-lg shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                        >
                            ✕
                        </button>

                        <h2 className="text-4xl font-serif text-gold mb-2">{activeItem.title}</h2>
                        <div className="flex items-center gap-4 text-zinc-400 text-sm mb-6 border-b border-zinc-800 pb-4">
                            <span>{activeItem.author}</span>
                            <span>•</span>
                            <span>{activeItem.date}</span>
                        </div>

                        <p className="text-lg font-sans text-gray-300 leading-relaxed">
                            {activeItem.description}
                        </p>

                        <div className="mt-8 flex justify-end">
                            <button
                                className="px-6 py-2 bg-burgundy/20 text-burgundy hover:bg-burgundy hover:text-white transition-colors border border-burgundy rounded hover:shadow-[0_0_15px_rgba(128,0,32,0.5)]"
                                onClick={closeModal}
                            >
                                Close Exhibit
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
