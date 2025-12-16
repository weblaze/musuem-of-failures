import { motion } from 'framer-motion';
import { useStore } from '../../stores/useStore';
import { useAuthStore } from '../../stores/useAuthStore';

export const Interface = () => {
    const modalOpen = useStore((state) => state.modalOpen);
    const { isAuthenticated, user, setAuthModalOpen, logout } = useAuthStore();

    return (
        <div className={`absolute inset-0 pointer-events-none ${modalOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
            <div className="absolute top-8 left-8 pointer-events-auto">
                <h1 className="text-2xl font-serif text-white tracking-widest uppercase mb-2">
                    Museum of <span className="text-red-600">Failures</span>
                </h1>

                {isAuthenticated ? (
                    <div className="flex items-center gap-4 text-sm font-sans flex-wrap">
                        <span className="text-zinc-400">Curator: <span className="text-gold">{user?.username}</span></span>
                        <button
                            onClick={logout}
                            className="text-zinc-500 hover:text-white transition-colors"
                        >
                            Sign Out
                        </button>
                        <div className="w-full"></div>
                        <button
                            onClick={() => document.dispatchEvent(new CustomEvent('openSubmitModal'))}
                            className="text-sm bg-gold/10 text-gold hover:bg-gold hover:text-black border border-gold/50 px-3 py-1 rounded transition-all"
                        >
                            + Contribute Failure
                        </button>

                        {useStore(s => s.mode) === 'public' ? (
                            <button
                                onClick={() => useStore.getState().setMode('attic')}
                                className="text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1 rounded transition-all"
                            >
                                Visit Attic (Private)
                            </button>
                        ) : (
                            <button
                                onClick={() => useStore.getState().setMode('public')}
                                className="text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1 rounded transition-all"
                            >
                                Return to Main Hall
                            </button>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => setAuthModalOpen(true)}
                        className="text-sm font-sans text-gold hover:text-white border border-gold/30 hover:border-gold px-4 py-1 rounded transition-all"
                    >
                        Sign In / Join
                    </button>
                )}
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
