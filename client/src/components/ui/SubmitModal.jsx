import { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useStore } from '../../stores/useStore';
import api from '../../lib/api';
import { AnimatePresence, motion } from 'framer-motion';

export const SubmitModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ title: '', content: '', color: '#800020' });
    const [loading, setLoading] = useState(false);
    const addExhibit = useStore((state) => state.addExhibit);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post('/posts', formData);

            // Transform and add to local store immediately for UX
            const di = JSON.parse(res.data.displayItem);
            const newExhibit = {
                id: res.data.id,
                title: res.data.title,
                description: res.data.content,
                author: res.data.author, // Might need to be populated on server return or just use store user
                date: new Date().getFullYear().toString(),
                color: di.color
            };

            addExhibit(newExhibit);
            onClose();
            setFormData({ title: '', content: '', color: '#800020' });
        } catch (error) {
            console.error("Submission failed", error);
            alert('Failed to submit exhibit');
        }
        setLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-zinc-900 border border-gold/30 p-8 max-w-lg w-full rounded-lg shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-3xl font-serif text-gold mb-6 text-center">Share Your Failure</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-zinc-400 text-sm mb-1">Title of Failure</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-gold focus:outline-none"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-zinc-400 text-sm mb-1">The Story</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-gold focus:outline-none resize-none"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-zinc-400 text-sm mb-1">Aesthetic Color</label>
                                <div className="flex gap-2">
                                    {['#800020', '#1a2b3c', '#5c4033', '#4a0404', '#2d1b1b'].map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            className={`w-8 h-8 rounded-full border-2 ${formData.color === c ? 'border-gold' : 'border-transparent'}`}
                                            style={{ backgroundColor: c }}
                                            onClick={() => setFormData({ ...formData, color: c })}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="public-check"
                                    checked={formData.isPublic !== false}
                                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                                    className="w-4 h-4 accent-gold"
                                />
                                <label htmlFor="public-check" className="text-zinc-400 text-sm cursor-pointer">
                                    Display in Public Museum? (Uncheck for Attic only)
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-burgundy text-white rounded font-serif hover:bg-red-900 transition-colors mt-4"
                            >
                                {loading ? 'Submitting...' : 'Immortalize Failure'}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
