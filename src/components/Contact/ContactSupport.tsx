import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { contactSchema } from '../../validation';
import type { IContactForm } from '../../types';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormTextarea from './FormTextarea';
import ContactInfoCard from './ContactInfoCard';
import UrgentIssuesBox from './UrgentIssuesBox';

import { Button } from '../ui/Button';
import { Send } from 'lucide-react';
import { slideInLeftVariant } from '../../utils/animations';

const ContactSupport = () => {
  

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IContactForm>({
        resolver: yupResolver(contactSchema),
        mode: 'onTouched',
    });

    const onSubmit = (data: IContactForm) => {
        const message = `
*New Contact Inquiry*
--------------------------
*Full Name:* ${data.fullName}
*Email:* ${data.email}
*Phone:* ${data.phoneNumber}
*Subject:* ${data.subject}
--------------------------
*Message:* 
${data.message}
        `.trim();

        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = "201287677534"; // 01287677534 without leading 0, plus 20
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    const subjectOptions = [
        { value: 'General Inquiry', label: 'General Inquiry' },
        { value: 'Booking Issue', label: 'Booking Issue' },
        { value: 'Special Group Booking', label: 'Special Group Booking' },
        { value: 'Lost & Found', label: 'Lost & Found' },
        { value: 'Technical Support', label: 'Technical Support' },
        { value: 'Other', label: 'Other' },
    ];

  
    return (
        <section className="py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
               
                <motion.div
                      variants={slideInLeftVariant}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                    className="lg:col-span-2"
                >
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">Send us a Message</h2>
                        <div className="w-20 h-1 bg-[#C5A059] rounded-full" />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Full Name"
                                id="fullName"
                                placeholder="Enter your full name"
                                required
                                error={errors.fullName?.message}
                                {...register('fullName')}
                            />
                            <FormInput
                                label="Email Address"
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                required
                                error={errors.email?.message}
                                {...register('email')}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Phone Number"
                                id="phoneNumber"
                                placeholder="01xxxxxxxxx"
                                required
                                error={errors.phoneNumber?.message}
                                {...register('phoneNumber')}
                            />
                            <FormSelect
                                label="Subject"
                                id="subject"
                                required
                                options={subjectOptions}
                                error={errors.subject?.message}
                                {...register('subject')}
                            />
                        </div>

                        <FormTextarea
                            label="Message"
                            id="message"
                            placeholder="How can we help you?"
                            required
                            error={errors.message?.message}
                            {...register('message')}
                        />

                        <div className="pt-2">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full md:w-auto flex items-center gap-2"
                                disabled={!isValid}
                            >
                                <Send />
                                Send via WhatsApp
                            </Button>
                        </div>
                    </form>
                </motion.div>

               
                <div className="space-y-8">
                    <ContactInfoCard
                        title="Contact Information"
                        details={[
                            {
                                label: 'Booking Hotline',
                                value: '19000',
                                href: 'tel:19000',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                )
                            },
                            {
                                label: 'Email Address',
                                value: 'support@luxurecinema.com',
                                href: 'mailto:support@luxurecinema.com',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                )
                            },
                            {
                                label: 'Main Theater Location',
                                value: 'Cairo Festival City, New Cairo, Egypt',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )
                            }
                        ]}
                    />

                    <UrgentIssuesBox />
                </div>
            </div>
        </section>
    );
};

export default ContactSupport;
