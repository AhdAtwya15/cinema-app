import { motion } from 'framer-motion';
import type { ICastMember } from '../../../types';
import { getOptimizedCloudinaryUrl } from '../../../utils/cloudinary';

interface CastCardProps {
    member: ICastMember;
}

const CastCard = ({ member }: CastCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="flex flex-col items-center gap-3 shrink-0 w-24 md:w-28"
        >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#C5A059]/20 shadow-lg relative">
                <img
                    src={getOptimizedCloudinaryUrl(member.preview, { width: 200 })}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />

            </div>
            <div className="text-center">
                <p className="text-white text-xs md:text-sm font-medium line-clamp-1">{member.name}</p>
                <p className="text-slate-400 text-[10px] md:text-xs line-clamp-1">{member.role}</p>
            </div>
        </motion.div>
    );
};

export default CastCard;
