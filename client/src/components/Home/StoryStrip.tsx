import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import friend1 from "@/assets/Dummy/Images/Broken Playstation 3 Controller HD Wallpapers.jpg"
import friend2 from "@/assets/Dummy/Images/Kaneki Kenn Tokyo Ghoul.png"
import friend3 from "@/assets/Dummy/Images/e1532520016e4f8d4b5f0fa770008724.jpeg"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const friends = [
  {
    image: friend1,
    name: "John Wick",
    view: true,
  },
  {
    image: friend2,
    name: "Scarlet Johnson",
    view: false,
  },
  {
    image: friend3,
    name: "Captain America",
    view: true,
  },
  {
    image: friend1,
    name: "Spider-Man",
    view: false,
  },
  {
    image: friend2,
    name: "Hulk",
    view: true,
  },
  {
    image: friend3,
    name: "Rose",
    view: true,
  },
  {
    image: friend1,
    name: "venom",
    view: false,
  },
  {
    image: friend3,
    name: "Mercury",
    view: true,
  },
  // 
  {
    image: friend2,
    name: "Hulk",
    view: true,
  },
  {
    image: friend3,
    name: "Rose",
    view: true,
  },
  {
    image: friend1,
    name: "venom",
    view: false,
  },
  {
    image: friend3,
    name: "Mercury",
    view: true,
  },
  {
    image: friend2,
    name: "Hulk",
    view: true,
  },
  {
    image: friend3,
    name: "Rose",
    view: true,
  },
  {
    image: friend1,
    name: "venom",
    view: false,
  },
  {
    image: friend3,
    name: "Mercury",
    view: true,
  },
  {
    image: friend2,
    name: "Hulk",
    view: true,
  },
  {
    image: friend3,
    name: "Rose",
    view: true,
  },
  {
    image: friend1,
    name: "venom",
    view: false,
  },
  {
    image: friend3,
    name: "Mercury",
    view: true,
  }
]


const StoryStrip: React.FC = () => {
  return (
    <div className="w-full md:w-4/5 lg:w-2/5 mx-auto flex flex-row items-center mt-4 gap-x-2 md:gap-x-8 select-none">
      {/* Own story */}
      <div className="w-20 flex-shrink-0">
        <Avatar className="w-20 h-20 border-gray-500 border-2">
          {/* <AvatarImage className="object-cover" src={friend3} /> */}
          <AvatarFallback className="text-white bg-black">+</AvatarFallback>
        </Avatar>
        <p className="text-center text-xs mt-1">Post a Story</p>
      </div>

      {/* Friends stories */}
      <ScrollArea className="w-full rounded-md whitespace-nowrap">
        <div className="flex gap-x-4 ">
          {friends.map((friend, index) => (
            <div key={index} className="w-20  flex flex-col flex-shrink-0">
              <Avatar
                className={`w-20 h-20  border-[3px] ${friend.view ? "border-gray-300" : "border-indigo-400"
                  }`}
              >
                <AvatarImage className="object-cover" src={friend.image} />
              </Avatar>
              <p className="text-center mt-1 text-xs">{friend.name}</p>
            </div>
          ))}
        </div>
        {/* <ScrollAreaThumb className="bg-blue-500" /> */}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default StoryStrip
