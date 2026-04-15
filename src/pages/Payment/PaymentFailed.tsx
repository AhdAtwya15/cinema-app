import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, Home, RefreshCcw, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { fadeSlideUpVariant, fadeScaleVariant } from '../../utils/animations';

const PaymentFailedPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#191C33] flex items-center justify-center pt-24 pb-20 px-4 md:px-8 relative overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/10 blur-[130px] rounded-full" />
            <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full" />

            <div className="max-w-2xl w-full relative z-10">
                <motion.div
                    variants={fadeScaleVariant}
                    initial="hidden"
                    animate="visible"
                    className="bg-[#1E2240]/40 backdrop-blur-xl rounded-[40px] border border-white/5 p-8 md:p-16 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-500/20 to-transparent" />

                    <motion.div
                        initial={{ scale: 0, rotate: 20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 260, 
                            damping: 20,
                            delay: 0.3 
                        }}
                        className="mb-8 relative"
                    >
                        <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 rounded-full animate-pulse" />
                        <div className="bg-linear-to-br from-red-500 to-orange-600 p-5 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.3)] relative">
                            <XCircle className="w-16 h-16 text-[#191C33]" strokeWidth={2.5} />
                        </div>
                    </motion.div>

                    <motion.h1
                        variants={fadeSlideUpVariant}
                        initial="hidden"
                        animate="visible"
                        className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 uppercase tracking-tight"
                    >
                        Payment Failed
                    </motion.h1>

                    <motion.div
                        variants={fadeSlideUpVariant}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.5 }}
                        className="space-y-4 mb-12"
                    >
                        <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-md mx-auto">
                            Something went wrong during the cinematic transaction. 
                            Don't worry, your <span className="text-red-400 font-semibold"> seats are still waiting </span> 
                            for you to claim them.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-slate-500 text-sm font-sans uppercase tracking-widest pt-4">
                            <AlertTriangle className="w-4 h-4 text-orange-500/60" />
                            <span>Your bank might have declined the request</span>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeSlideUpVariant}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                    >
                        <Button 
                            onClick={() => navigate('/movies')}
                            size="lg"
                            className="w-full sm:w-auto flex items-center gap-2 group bg-linear-to-br from-red-500 to-orange-600 hover:shadow-[rgba(239,68,68,0.4)]"
                        >
                            <RefreshCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
                            Try Again
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => navigate('/')}
                            size="lg"
                            className="w-full sm:w-auto flex items-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            Home
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="text-center mt-12 text-slate-500 text-xs font-sans uppercase tracking-[0.3em] font-medium"
                >
                    Need help? Contact our Support team
                </motion.p>
            </div>
        </div>
    );
};

export default PaymentFailedPage;
