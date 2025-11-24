// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Search,
//   Phone,
//   Video,
//   MoreVertical,
//   Smile,
//   Paperclip,
//   Send,
// } from "lucide-react";

// export default function ChatUI() {
//   return (
//     <div className="w-[70%] mx-auto h-full bg-background flex py-4 gap-4 pr-16">
//       <Card className="w-80 h-full rounded-2xl shadow-lg border-border">
//         <CardContent className="p-4 flex flex-col h-full">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-foreground">
//               Active chats
//             </h2>
//             <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
//               6
//             </span>
//           </div>

//           <div className="relative mb-4">
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search for chats"
//               className="pl-9 bg-background border-border"
//             />
//           </div>

//           <div className="flex flex-col gap-2 overflow-auto">
//             {[
//               { name: "Frances Guerrero", last: "Frances sent a photo." },
//               { name: "Carolyn Ortiz", last: "You missed a call form 👍" },
//               { name: "Billy Vasquez", last: "Day sweetness 😁" },
//               { name: "Dennis, Ortiz", last: "Ortiz: I'm adding Jhon" },
//               { name: "Knight, Billy, Bryan", last: "Billy: Thank you!" },
//               { name: "StackBros crew", last: "You: Okay thanks, everyone." },
//             ].map((chat, i) => (
//               <div
//                 key={i}
//                 className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
//                   i === 0
//                     ? "bg-primary/10 border border-primary/20"
//                     : "hover:bg-accent"
//                 }`}
//               >
//                 <Avatar className="h-11 w-11 ring-2 ring-border">
//                   <AvatarImage src="" />
//                   <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
//                     {chat.name.charAt(0)}
//                   </AvatarFallback>
//                 </Avatar>

//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-foreground truncate">
//                     {chat.name}
//                   </p>
//                   <p className="text-xs text-muted-foreground truncate">
//                     {chat.last}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="flex-1 rounded-2xl shadow-lg border-border">
//         <CardContent className="p-0 flex flex-col h-full">
//           <div className="p-4 border-b border-border flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Avatar className="h-12 w-12 ring-2 ring-border">
//                 <AvatarImage src="" />
//                 <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
//                   J
//                 </AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="font-semibold text-foreground">Judy Nguyen</p>
//                 <p className="text-xs text-green-500 flex items-center gap-1">
//                   <span className="h-2 w-2 rounded-full bg-green-500"></span>
//                   Online
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <Button variant="ghost" size="icon" className="hover:bg-accent">
//                 <Phone className="h-5 w-5" />
//               </Button>
//               <Button variant="ghost" size="icon" className="hover:bg-accent">
//                 <Video className="h-5 w-5" />
//               </Button>
//               <Button variant="ghost" size="icon" className="hover:bg-accent">
//                 <MoreVertical className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>

//           <div className="flex-1 p-6 overflow-auto space-y-6 bg-muted/20">
//             <div className="flex items-start gap-3">
//               <Avatar className="h-8 w-8 ring-2 ring-border">
//                 <AvatarImage src="" />
//                 <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
//                   J
//                 </AvatarFallback>
//               </Avatar>

//               <div>
//                 <p className="bg-card border border-border px-4 py-2 rounded-2xl rounded-tl-sm inline-block shadow-sm">
//                   Please find the attached updated files
//                 </p>
//                 <p className="text-xs text-muted-foreground mt-1">12:16 PM</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <Avatar className="h-8 w-8 ring-2 ring-border">
//                 <AvatarImage src="" />
//                 <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
//                   J
//                 </AvatarFallback>
//               </Avatar>

//               <div>
//                 <p className="bg-card border border-border px-4 py-2 rounded-2xl rounded-tl-sm inline-block shadow-sm">
//                   How promotion excellent curiosity yet attempted happiness Gay
//                   prosperous impression🥰
//                 </p>
//                 <p className="text-xs text-muted-foreground mt-1">3:22 PM</p>
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <div>
//                 <p className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-sm inline-block shadow-md">
//                   And sir dare view but over man So at within mr to simple
//                   assure Mr disposing.
//                 </p>
//                 <p className="text-right text-xs text-muted-foreground mt-1">
//                   5:35 PM ✓
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="p-4 border-t border-border bg-card flex items-center gap-3">
//             <Input
//               placeholder="Type a message"
//               className="flex-1 bg-background border-border"
//             />

//             <Button variant="ghost" size="icon" className="hover:bg-accent">
//               <Smile className="text-muted-foreground" />
//             </Button>

//             <Button variant="ghost" size="icon" className="hover:bg-accent">
//               <Paperclip className="text-muted-foreground" />
//             </Button>

//             <Button className="bg-primary text-primary-foreground shadow-md hover:shadow-lg">
//               <Send className="w-5 h-5" />
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Send,
} from "lucide-react";

export default function ChatUI() {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col md:flex-row p-2 sm:p-4 gap-4 md:pr-10">
      
      {/* Left Sidebar - Chat List */}
      <Card className="w-full md:w-80 h-[400px] md:h-full rounded-2xl shadow-lg border-border">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Active chats</h2>
            <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">6</span>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for chats"
              className="pl-9 bg-background border-border"
            />
          </div>

          {/* Chat List */}
          <div className="flex flex-col gap-2 overflow-auto flex-1">
            {[
              { name: "Frances Guerrero", last: "Frances sent a photo." },
              { name: "Carolyn Ortiz", last: "You missed a call form 👍" },
              { name: "Billy Vasquez", last: "Day sweetness 😁" },
              { name: "Dennis, Ortiz", last: "Ortiz: I'm adding Jhon" },
              { name: "Knight, Billy, Bryan", last: "Billy: Thank you!" },
              { name: "StackBros crew", last: "You: Okay thanks, everyone." },
            ].map((chat, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  i === 0
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-accent"
                }`}
              >
                <Avatar className="h-11 w-11 ring-2 ring-border">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
                    {chat.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{chat.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{chat.last}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Content Area */}
      <Card className="flex-1 rounded-2xl shadow-lg border-border h-[70vh] md:h-full">
        <CardContent className="p-0 flex flex-col h-full">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 ring-2 ring-border">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
                  J
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">Judy Nguyen</p>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span> Online
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-accent"><Phone className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="hover:bg-accent"><Video className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="hover:bg-accent"><MoreVertical className="h-5 w-5" /></Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 sm:p-6 overflow-auto space-y-6 bg-muted/20">
            {/* Received Message */}
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 ring-2 ring-border">
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
              <div>
                <p className="bg-card border border-border px-4 py-2 rounded-2xl rounded-tl-sm inline-block shadow-sm">
                  Please find the attached updated files
                </p>
                <p className="text-xs text-muted-foreground mt-1">12:16 PM</p>
              </div>
            </div>

            {/* Sent Message */}
            <div className="flex justify-end">
              <div>
                <p className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-sm inline-block shadow-md max-w-xs sm:max-w-md">
                  And sir dare view but over man So at within mr to simple assure Mr disposing.
                </p>
                <p className="text-right text-xs text-muted-foreground mt-1">5:35 PM ✓</p>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-3 sm:p-4 border-t border-border bg-card flex items-center gap-2 sm:gap-3">
            <Input placeholder="Type a message" className="flex-1 bg-background border-border" />

            <Button variant="ghost" size="icon" className="hover:bg-accent"><Smile /></Button>
            <Button variant="ghost" size="icon" className="hover:bg-accent"><Paperclip /></Button>
            <Button className="bg-primary text-primary-foreground shadow-md hover:shadow-lg">
              <Send className="w-5 h-5" />
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
