import { motion } from 'framer-motion';
import { slideInRightVariant } from '../../utils/animations';

const UrgentIssuesBox = () => {
    return (
        <motion.div
              variants={slideInRightVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
            className="bg-linear-to-br from-[#C5A059]/20 to-transparent border border-[#C5A059]/30 rounded-2xl p-6 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059]/5 blur-2xl rounded-full" />

            <h3 className="text-[#C5A059] text-lg font-serif font-bold mb-2">Urgent Show-Related Issues?</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                If you're currently at the theater and experiencing issues with your screening, please use our 24/7 emergency hotline.
            </p>

            <a
                href="tel:19000"
                className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#b08f4f] text-black px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Hotline Now
            </a>
        </motion.div>
    );
};

export default UrgentIssuesBox;
