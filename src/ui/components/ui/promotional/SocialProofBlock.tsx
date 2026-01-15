
import Image from "next/image";

export const SocialProofBlock = () => {
    return (
        <div className="mt-16 flex items-center justify-center lg:justify-start gap-4">
                   <div className="flex -space-x-4">
                     {[1, 2, 3, 4].map((i) => (
                       <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-brand-tan flex items-center justify-center overflow-hidden">
                         <Image 
                           src={`https://i.pravatar.cc/150?u=${i+10}`} 
                           alt="user" 
                           width={48} 
                           height={48} 
                         />
                       </div>
                     ))}
                   </div>
                   <div className="text-left">
                     <div className="font-bold text-brand-brown text-sm">Join 15,000+ culprits</div>
                     <div className="text-brand-text-muted text-xs font-semibold uppercase italic tracking-tighter">Doing what they&apos;re told since &apos;24</div>
                   </div>
                 </div>
    );
};