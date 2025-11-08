import React, { useState } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Image as ImageIcon, Video, Calendar, Smile } from 'lucide-react'
import image from "@/assets//Dummy/Images/e1532520016e4f8d4b5f0fa770008724.jpeg"

const CreatePost: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className='w-full md:w-4/5 lg:w-2/5 mx-auto mt-6'>
            <div className='bg-card p-6 border-2 border-border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm'>
                <div className='flex gap-x-4 mb-6'>
                    <Avatar className='h-12 w-12 ring-2 ring-primary/20'>
                        <AvatarImage className='object-cover' src={image} />
                    </Avatar>
                    <input 
                        type="text" 
                        placeholder="What's on your mind?" 
                        className='flex-1 font-normal outline-none bg-muted/50 rounded-full px-6 py-3 text-foreground placeholder:text-muted-foreground hover:bg-muted transition-colors focus:ring-2 focus:ring-primary/50' 
                        onFocus={() => setIsExpanded(true)}
                    />
                </div>
        
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-70'}`}>
                    <button className='bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 flex flex-row justify-center items-center px-4 py-3 rounded-xl gap-x-2 transition-all duration-300 hover:scale-105 hover:shadow-md group'>
                        <ImageIcon className='h-5 w-5 text-green-500 group-hover:scale-110 transition-transform' />
                        <span className='text-sm font-medium text-foreground'>Photo</span>
                    </button>
                    <button className='bg-gradient-to-br from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10 flex flex-row justify-center items-center px-4 py-3 rounded-xl gap-x-2 transition-all duration-300 hover:scale-105 hover:shadow-md group'>
                        <Video className='h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform' />
                        <span className='text-sm font-medium text-foreground'>Video</span>
                    </button>
                    <button className='bg-gradient-to-br from-destructive/10 to-destructive/5 hover:from-destructive/20 hover:to-destructive/10 flex flex-row justify-center items-center px-4 py-3 rounded-xl gap-x-2 transition-all duration-300 hover:scale-105 hover:shadow-md group'>
                        <Calendar className='h-5 w-5 text-red-500 group-hover:scale-110 transition-transform' />
                        <span className='text-sm font-medium text-foreground'>Event</span>
                    </button>
                    <button className='bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 hover:from-yellow-500/20 hover:to-yellow-500/10 flex flex-row justify-center items-center px-4 py-3 rounded-xl gap-x-2 transition-all duration-300 hover:scale-105 hover:shadow-md group'>
                        <Smile className='h-5 w-5 text-yellow-500 group-hover:scale-110 transition-transform' />
                        <span className='text-sm font-medium text-foreground'>Feeling</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost

