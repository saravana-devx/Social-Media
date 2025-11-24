// import { useCurrentUserQuery } from "@/hooks/api/useUser";
// import { openPostModal } from "@/store/slices/postModal.slice";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Calendar, ImageIcon, Smile, Video } from "lucide-react";
// import { useDispatch } from "react-redux";

// const ActionButton = ({
//   icon,
//   label,
//   gradient,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   gradient: string;
// }) => (
//   <button
//     className={`
//       ${gradient}
//       flex flex-row justify-center items-center
//       px-3 py-2 sm:px-4 sm:py-3
//       rounded-xl gap-x-2
//       transition-all duration-300
//       hover:scale-105 hover:shadow-md
//       text-xs sm:text-sm font-medium text-foreground
//       group
//     `}
//   >
//     <span className="group-hover:scale-110 transition-transform">{icon}</span>
//     {label}
//   </button>
// );

// const CreatePost: React.FC = () => {
//   const dispatch = useDispatch();
//   const { data } = useCurrentUserQuery();
//   const user = data?.data;

//   return (
//     <div className="w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-4 px-3 sm:px-0">
//       <div className="bg-card p-4 sm:p-6 border border-border rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
//         <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
//           <Avatar className="h-10 w-10  ring-4 ring-primary/20">
//             <AvatarImage className="object-cover" src={user?.profileImage} />
//             <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold">
//               {user.fullName?.charAt(0).toUpperCase()}
//             </AvatarFallback>
//           </Avatar>

//           <input
//             type="text"
//             placeholder="What's on your mind?"
//             className="
//             w-full
//               cursor-pointer select-none
//               text-sm sm:text-base
//               outline-none  rounded-full
//               px-4 py-2 sm:px-6 sm:py-3
//               text-foreground placeholder:text-muted-foreground
//               focus:ring-2 focus:ring-primary/50
//             "
//             readOnly
//             onClick={() => {
//               dispatch(openPostModal());
//               console.log("clicked");
//             }}
//           />
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-4  gap-2 sm:gap-3  transition-all duration-300">
//           <ActionButton
//             icon={<ImageIcon className="h-5 w-5 text-green-500" />}
//             label="Photo"
//             gradient="from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10"
//           />

//           <ActionButton
//             icon={<Video className="h-5 w-5 text-blue-500" />}
//             label="Video"
//             gradient="from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10"
//           />

//           <ActionButton
//             icon={<Calendar className="h-5 w-5 text-red-500" />}
//             label="Event"
//             gradient="from-destructive/10 to-destructive/5 hover:from-destructive/20 hover:to-destructive/10"
//           />

//           <ActionButton
//             icon={<Smile className="h-5 w-5 text-yellow-500" />}
//             label="Feeling"
//             gradient="from-yellow-500/10 to-yellow-500/5 hover:from-yellow-500/20 hover:to-yellow-500/10"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;

// src/components/post/CreatePost.tsx
import { useCurrentUserQuery } from "@/hooks/api/useUser";
import { openPostModal } from "@/store/slices/postModal.slice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, ImageIcon, Smile, Video } from "lucide-react";
import { useDispatch } from "react-redux";

const ActionButton = ({
  icon,
  label,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  gradient: string;
}) => (
  <button
    className={`
      ${gradient}
      flex flex-row justify-center items-center 
      px-3 py-2 sm:px-4 sm:py-3 
      rounded-xl gap-x-2
      transition-all duration-300 
      hover:scale-105 hover:shadow-md 
      text-xs sm:text-sm font-medium text-foreground
      group
    `}
  >
    <span className="group-hover:scale-110 transition-transform">{icon}</span>
    {label}
  </button>
);

const CreatePost: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useCurrentUserQuery();
  const user = data?.data;

  return (
    <div className="w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-4 sm:px-0">
      <div className="bg-card p-4 sm:p-6 border border-border rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
        <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Avatar className="h-10 w-10  ring-4 ring-primary/20">
            <AvatarImage className="object-cover" src={user?.profileImage} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold">
              {user?.fullName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <input
            type="text"
            placeholder="What's on your mind?"
            className="
              w-full
              cursor-pointer select-none
              text-sm sm:text-base
              outline-none  rounded-full 
              px-4 py-2 sm:px-6 sm:py-3
              text-foreground placeholder:text-muted-foreground
              focus:ring-2 focus:ring-primary/50
            "
            readOnly
            onClick={() => {
              // added undefined because we want to create post not to edit post
              dispatch(openPostModal(undefined)); // create mode
            }}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 transition-all duration-300">
          <ActionButton
            icon={<ImageIcon className="h-5 w-5 text-green-500" />}
            label="Photo"
            gradient="from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10"
          />
          <ActionButton
            icon={<Video className="h-5 w-5 text-blue-500" />}
            label="Video"
            gradient="from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10"
          />
          <ActionButton
            icon={<Calendar className="h-5 w-5 text-red-500" />}
            label="Event"
            gradient="from-destructive/10 to-destructive/5 hover:from-destructive/20 hover:to-destructive/10"
          />
          <ActionButton
            icon={<Smile className="h-5 w-5 text-yellow-500" />}
            label="Feeling"
            gradient="from-yellow-500/10 to-yellow-500/5 hover:from-yellow-500/20 hover:to-yellow-500/10"
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
