import { motion } from "framer-motion";
import ContactSupport from "../../components/Contact/ContactSupport";

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-[#191C33] pt-28 pb-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">

            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/11 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/11 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight"
                    >
                        CONTACT <span className="text-[#D4A853]">US</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto font-light"
                    >
                        Have questions about movie bookings or special events? Our team is here to help you!
                    </motion.p>
                </div>

                <ContactSupport />
            </div>
        </div>
    );
}

export default ContactPage