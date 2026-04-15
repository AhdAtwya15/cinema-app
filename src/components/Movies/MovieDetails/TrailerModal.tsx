import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { fadeScaleVariant } from '../../../utils/animations';

interface TrailerModalProps {
    isOpen: boolean;
    onClose: () => void;
    trailerUrl: string;
}

const TrailerModal = ({ isOpen, onClose, trailerUrl }: TrailerModalProps) => {

    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(trailerUrl);
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    <motion.div
                        variants={fadeScaleVariant}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="relative w-full max-w-4xl aspect-video bg-[#1E223D] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-[#C5A059] transition-all duration-300"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {videoId ? (
                            <iframe
                                src={embedUrl}
                                title="Movie Trailer"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-slate-400">
                                Trailer not available
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TrailerModal;
