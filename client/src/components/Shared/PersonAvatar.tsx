import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

type PersonAvatarProps = {
    view: boolean;
    image: string;
};

const PersonAvatar: React.FC<PersonAvatarProps> = ({ view, image }) => {
    return (
        <div className="w-16 h-16">
            <Avatar
                className={`w-16 h-16 rounded-full overflow-hidden border-[3px] ${view ? 'border-gray-300' : 'border-indigo-400'
                    }`}
            >
                <AvatarImage
                    src={image}
                    alt="User avatar"
                    className="w-full h-full rounded-full object-cover"
                />
                <AvatarFallback className="flex items-center justify-center text-white bg-black">
                    N/A
                </AvatarFallback>
            </Avatar>
        </div>
    );
};

export default PersonAvatar;
