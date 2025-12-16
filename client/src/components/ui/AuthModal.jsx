import { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { AnimatePresence, motion } from 'framer-motion';

export const AuthModal = () => {
    const { authModalOpen, setAuthModalOpen, login, register } = useAuthStore();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        let res;
        if (isLogin) {
            res = await login(formData.email, formData.password);
        } else {
            res = await register(formData.email, formData.username, formData.password);
        }

        if (!res.success) {
            setError(res.error);
        }
        setLoading(false);
    };

    return (
        <AnimatePresence>
            {authModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setAuthModalOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-zinc-900 border border-gold/30 p-8 max-w-md w-full rounded-lg shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-3xl font-serif text-gold mb-6 text-center">
                            {isLogin ? 'Welcome Back' : 'Join the Museum'}
                        </h2>

                        {error && (
                            <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-3 rounded mb-4 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-zinc-400 text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-gold focus:outline-none transition-colors"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            {!isLogin && (
                                <div>
                                    <label className="block text-zinc-400 text-sm mb-1">Username</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-gold focus:outline-none transition-colors"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-zinc-400 text-sm mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-gold focus:outline-none transition-colors"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-burgundy text-white rounded font-serif hover:bg-red-900 transition-colors disabled:opacity-50 mt-4"
                            >
                                {loading ? 'Processing...' : (isLogin ? 'Enter Museum' : 'Create Account')}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                                className="text-zinc-500 hover:text-gold text-sm transition-colors"
                            >
                                {isLogin ? "Don't have an exhibit? Sign up" : 'Already a curator? Login'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
