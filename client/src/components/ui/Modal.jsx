import { useStore } from '../../stores/useStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { AnimatePresence, motion } from 'framer-motion';

export const Modal = () => {
    const { modalOpen, activeItem, closeModal, togglePrivacy } = useStore();
    const user = useAuthStore((state) => state.user);

    // Check if the current user is the author
    // Note: requires basic string comparison on username since authorId isn't on activeItem yet, 
    // or better, update formatPost to include authorId but here let's assume username is unique enough for MVP
    // For safer check, backend does validation anyway.
    const isAuthor = user && activeItem && user.username === activeItem.author;

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
                            {isAuthor && (
                                <span className={`text-xs px-2 py-0.5 border rounded ${activeItem.isPublic ? 'border-green-800 text-green-500' : 'border-red-800 text-red-500'}`}>
                                    {activeItem.isPublic ? 'Public' : 'Private'}
                                </span>
                            )}
                        </div>

                        <p className="text-lg font-sans text-gray-300 leading-relaxed">
                            {activeItem.description}
                        </p>

                        <div className="mt-8 flex justify-end gap-4">
                            {isAuthor && (
                                <button
                                    className="px-4 py-2 text-sm text-zinc-400 border border-zinc-700 hover:border-white hover:text-white transition-colors rounded"
                                    onClick={() => togglePrivacy(activeItem.id)}
                                >
                                    {activeItem.isPublic ? 'Make Private' : 'Make Public'}
                                </button>
                            )}
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
