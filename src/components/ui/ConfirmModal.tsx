import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, title, message, onConfirm, onCancel, isLoading }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCancel}
                        className="absolute inset-0 bg-[#0F0F23]/80 backdrop-blur-xs"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-sm bg-[#1A1A2E] border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col gap-4 overflow-hidden z-10"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50" />
                        <div className="flex justify-between items-start">
                           <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                               <AlertTriangle className="w-6 h-6 text-red-500" />
                           </div>
                           <button onClick={onCancel} className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5">
                               <X className="w-4 h-4" />
                           </button>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2 font-serif">{title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={onCancel}
                                disabled={isLoading}
                                className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className="flex-1 py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 shadow-lg shadow-red-500/20 text-white font-bold transition-all hover:-translate-y-0.5 text-sm flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
