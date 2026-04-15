import { memo, useState } from "react";
import { m } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { slideInRightVariant } from "../../utils/animations";

const NewsletterBox = memo(function NewsletterBox() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setEmail("");
        }
    };

    return (
        <m.div
            className="bg-[#1A2232] rounded-3xl p-6 border border-[#C5A059]/20 shadow-xl overflow-hidden relative"
            variants={slideInRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            aria-label="Newsletter subscription"
        >
            <div
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[#C5A059]/8 blur-2xl pointer-events-none"
                aria-hidden="true"
            />

            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#C5A059]/15 flex items-center justify-center shrink-0 border border-[#C5A059]/30">
                    <Mail className="w-4.5 h-4.5 text-[#C5A059]" aria-hidden="true" focusable="false" />
                </div>
                <h4 className="text-white font-serif font-semibold text-lg leading-tight">
                    Join CineNews
                </h4>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed mb-5">
                Get the latest cinema exclusives, premiere updates, and behind-the-scenes stories delivered straight to your inbox.
            </p>

            {submitted ? (
                <div className="flex items-center gap-2 text-[#C5A059] font-medium text-sm py-3 px-4 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/25">
                    <Mail className="w-4 h-4 shrink-0" aria-hidden="true" focusable="false" />
                    You're in! Check your inbox.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3" aria-label="Newsletter signup form">
                    <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                    <input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full bg-[#191C33] border border-neutral-700 focus:border-[#C5A059]/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 transition-colors duration-200"
                        autoComplete="email"
                    />
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 bg-linear-to-br from-[#D4A853] via-[#F0C97A] to-[#B8892F] text-[#1A1A2E] font-semibold text-sm tracking-wide uppercase transition-opacity hover:opacity-90"
                    >
                        <Send className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
                        Subscribe
                    </button>
                </form>
            )}
        </m.div>
    );
});

export default NewsletterBox;
