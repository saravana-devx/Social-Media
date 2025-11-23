// import React from "react";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";

// const Comment: React.FC = () => {
//   const { comments, newComment, setNewComment, autoGrow, handlePostComment } =
//     useComments();

//   return (
//     <div className="w-full max-w-2xl mx-auto space-y-6 font-sans">
//       {/* Input Section */}
//       <div className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
//         <Avatar className="w-10 h-10">
//           <AvatarImage src="/dummy/currentUser.jpg" />
//         </Avatar>

//         <div className="flex-1">
//           <textarea
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             onInput={autoGrow}
//             placeholder="Share your thoughts..."
//             className="text-sm bg-gray-50 rounded-xl px-3 py-2 border transition-all w-full resize-none"
//           />
//           <div className="flex justify-end">
//             <Button onClick={handlePostComment}>Post</Button>
//           </div>
//         </div>
//       </div>

//       {/* Comments List */}
//       <div className="space-y-6">
//         {comments.map((comment, i) => (
//           <div key={i} className="space-y-4">
//             <div className="flex gap-3">
//               <Avatar className="w-10 h-10">
//                 <AvatarImage src={comment.image} />
//                 <AvatarFallback>U</AvatarFallback>
//               </Avatar>

//               <div className="flex-1">
//                 <div className="bg-gray-100 rounded-2xl px-4 py-3">
//                   <div className="flex justify-between">
//                     <p className="font-semibold">{comment.name}</p>
//                     <p className="text-xs">{comment.posted}</p>
//                   </div>
//                   <p className="text-sm">{comment.description}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Replies */}
//             <div className="pl-12">
//               {comment.commentedOnComment.map((reply, j) => (
//                 <div key={j} className="flex gap-3">
//                   <Avatar className="w-8 h-8">
//                     <AvatarImage src={reply.image} />
//                   </Avatar>
//                   <div className="bg-gray-50 px-4 py-2 rounded-2xl">
//                     <p className="font-semibold">{reply.name}</p>
//                     <p className="text-sm">{reply.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Comment;

import React from "react";
import image from "@/assets/Dummy/Images/e1532520016e4f8d4b5f0fa770008724.jpeg";

import image2 from "@/assets/Dummy/Images/Kaneki Kenn Tokyo Ghoul.png";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const comments = [
  {
    image: image2,
    name: "Frances Guerrero",
    description:
      "Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection.",
    posted: "5hr",
    commentedOnComment: [
      {
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        name: "Ethan Ward",
        description:
          "Absolutely agree with your point! This is a game changer for sure.",
        posted: "4hr",
      },
      {
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        name: "Hannah Briggs",
        description:
          "Interesting perspective, I hadn’t thought about it like this.",
        posted: "3hr",
      },
    ],
  },
  {
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Julian Hayes",
    description:
      "Strictly resources it thoughtless or. No in he real went find mr. Wandered or strictly raillery stanhill.",
    posted: "2hr",
    commentedOnComment: [
      {
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        name: "Logan Fields",
        description:
          "Exactly my thoughts, Julian. We need to highlight this more often.",
        posted: "1hr",
      },
    ],
  },
  {
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Sophia Bennett",
    description:
      "Supposing breakfast dashwoods eagerness. It besides indeed added calling ham.",
    posted: "30min",
    commentedOnComment: [
      {
        image: "https://randomuser.me/api/portraits/women/4.jpg",
        name: "Emily Foster",
        description: "Love how you expressed this! It’s spot on.",
        posted: "20min",
      },
      {
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        name: "Nathan Drake",
        description: "This resonates a lot. Thank you for sharing!",
        posted: "10min",
      },
    ],
  },
];

const Comment: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 font-sans">
      {/* --- Input Section --- */}
      <div className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <Avatar className="w-10 h-10">
          <AvatarImage className="object-cover" src={image} />
        </Avatar>

        <div className="flex-1">
          <textarea
            placeholder="Share your thoughts..."
            className="font-normal text-sm text-gray-800 outline-none w-full pr-16 overflow-hidden resize-none bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
            rows={1}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = `${el.scrollHeight}px`;
            }}
          />
          <div className="flex justify-end">
            <Button className="mt-3 px-5 h-9 rounded-lg text-sm text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 shadow-sm hover:shadow-md transition-all">
              Post
            </Button>
          </div>
        </div>
      </div>

      {/* --- Comments List --- */}
      <div className="space-y-6">
        {comments.map((comment, i) => (
          <div key={i} className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={comment.image} className="object-cover" />
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="bg-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-gray-900 text-sm">
                      {comment.name}
                    </p>
                    <p className="text-xs text-gray-500">{comment.posted}</p>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {comment.description}
                  </p>
                </div>

                <div className="flex gap-4 text-xs text-gray-500 ml-2">
                  <button className="hover:text-indigo-500 transition">
                    Like (5)
                  </button>
                  <button className="hover:text-indigo-500 transition">
                    Reply
                  </button>
                </div>
              </div>
            </div>

            {/* Replies */}
            <div className="pl-12 space-y-3">
              {comment.commentedOnComment.map((reply, j) => (
                <div key={j} className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={reply.image} className="object-cover" />
                  </Avatar>

                  <div className="bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100 w-fit shadow-sm">
                    <div className="flex justify-between items-center mb-0.5">
                      <p className="font-semibold text-gray-900 text-sm">
                        {reply.name}
                      </p>
                      <p className="text-xs text-gray-500">{reply.posted}</p>
                    </div>
                    <p className="text-gray-700 text-sm">{reply.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
