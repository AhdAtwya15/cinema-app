import { motion } from 'framer-motion';
import { slideInRightVariant } from '../../utils/animations';

interface ContactInfoCardProps {
    title: string;
    details: {
        icon: React.ReactNode;
        label: string;
        value: string;
        href?: string;
    }[];
}

const ContactInfoCard = ({ title, details }: ContactInfoCardProps) => {
    return (
        <motion.div
            variants={slideInRightVariant}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
            className="bg-[#1E223D]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm"
        >
            <h3 className="text-white text-xl font-serif font-bold mb-6">{title}</h3>
            <div className="space-y-6">
                {details.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] shrink-0">
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                                {item.label}
                            </p>
                            {item.href ? (
                                <a
                                    href={item.href}
                                    className="text-white hover:text-[#C5A059] transition-colors duration-300 font-medium"
                                >
                                    {item.value}
                                </a>
                            ) : (
                                <p className="text-white font-medium">{item.value}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default ContactInfoCard;
