// import { useRef } from "react";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// import { X } from "lucide-react";

// import { useCurrentUserQuery } from "@/hooks/api/useUser";

// import PostActions from "./PostAction";

// interface PostModalProps {
//   open: boolean;
//   onClose: () => void;
//   post: any | null;
// }

// const PostModal = ({ open, onClose, post }: PostModalProps) => {
//   if (!post) return null;
//   const { data: userData } = useCurrentUserQuery();

//   const profileimg = userData?.data?.profileImage;
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const isImage = post.media?.resource_type === "image";
//   const mediaUrl =
//     post.media?.url || "https://via.placeholder.com/800x600?text=No+Media";

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent
//         className="
//           max-w-5xl 
//           w-full 
//           p-0 
//           bg-background 
//           overflow-hidden 
//           rounded-lg
//         "
//       >
//         <VisuallyHidden>
//           <DialogTitle>Post Details</DialogTitle>
//         </VisuallyHidden>

//         <button
//           onClick={onClose}
//           className="
//             absolute top-3 right-3 z-50 
//             p-2 bg-black/40 rounded-full 
//             hover:bg-black/60 transition
//           "
//         >
//           <X className="text-white w-5 h-5" />
//         </button>

//         <div className="grid grid-cols-1 md:grid-cols-2 h-[80vh] overflow-hidden">
//           <div className="bg-black flex justify-center items-center overflow-hidden">
//             {isImage ? (
//               <img
//                 src={mediaUrl}
//                 className="max-h-full max-w-full object-contain"
//                 alt="post"
//               />
//             ) : (
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 loop
//                 muted
//                 onClick={() => {
//                   if (videoRef.current) {
//                     if (videoRef.current.paused) {
//                       videoRef.current.play();
//                     } else {
//                       videoRef.current.pause();
//                     }
//                   }
//                 }}
//                 className="max-h-full max-w-full object-contain cursor-pointer"
//               >
//                 <source src={mediaUrl} type="video/mp4" />
//               </video>
//             )}
//           </div>

//           <div className="flex flex-col overflow-y-auto p-4">
//             {/* HEADER (User Info) */}
//             <div className="flex items-center gap-3 pb-3 border-b border-border">
//               <img
//                 src={post.userId?.profileImage}
//                 className="w-10 h-10 rounded-full object-cover"
//                 alt="user"
//               />
//               <div>
//                 <p className="font-semibold">{post.userId?.userName}</p>
//                 <p className="text-xs text-muted-foreground">
//                   {new Date(post.createdAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             <div className="py-3">
//               <p className="text-sm">{post.description}</p>
//             </div>

//             <PostActions
//               likes={post.likes?.length || 0}
//               comments={post.comments?.length || 0}
//               shares={post.shares || 0}
//             />

//             <div className="mt-4 border border-border rounded-lg p-2 flex items-center gap-3">
//               <img
//                 src={profileimg}
//                 className="w-8 h-8 rounded-full object-cover"
//                 alt=""
//               />
//               <input
//                 placeholder="Share your thoughts..."
//                 className="w-full bg-transparent outline-none text-sm"
//               />
//               <button className="bg-primary text-white px-4 py-1 rounded-md text-sm">
//                 Post
//               </button>
//             </div>

//             <div className="mt-4 flex flex-col gap-4">
//               {post.comments?.length > 0 ? (
//                 post.comments.map((c: any) => (
//                   <div key={c._id} className="flex gap-3">
//                     <img
//                       src={c.user?.profileImage}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <div>
//                       <p className="font-semibold text-sm">
//                         {c.user?.userName}
//                       </p>
//                       <p className="text-sm text-muted-foreground">{c.text}</p>
//                       <p className="text-xs text-muted-foreground mt-1">
//                         {new Date(c.createdAt).toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-muted-foreground text-sm">
//                   No comments yet.
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default PostModal;
