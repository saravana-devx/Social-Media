// import React, { useState } from "react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Users, Circle, ChevronLeft, ChevronRight } from "lucide-react";

// export default function RightSideBar() {
//   const [open, setOpen] = useState(true);

//   const contacts = [
//     { name: "Frances Guerrero", online: true },
//     { name: "Lori Ferguson", online: true },
//     { name: "Samuel Bishop", online: false },
//     { name: "Louis Crawford", online: true },
//     { name: "Dennis Barrett", online: true },
//     { name: "Judy Nguyen", online: true },
//     { name: "Bryan Knight", online: false },
//     { name: "Jacqueline Miller", online: true },
//     { name: "Amanda Reed", online: true },
//     { name: "Larry Lawson", online: false },
//   ];

//   const groups = ["Frances, Lori, ...", "Lawson, Knight"];

//   return (
//     <div
//       className={`fixed top-0 right-0 h-screen bg-white border-l shadow-lg transition-all duration-300 z-40 flex flex-col
//       ${open ? "w-20" : "w-64"}`}
//     >
//       {/* Toggle Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="absolute top-4 right-4 p-2 rounded-full border bg-white shadow hover:bg-gray-50"
//       >
//         {open ? (
//           <ChevronLeft className="h-5 w-5" />
//         ) : (
//           <ChevronRight className="h-5 w-5" />
//         )}
//       </button>

//       {/* OPEN STATE → only avatars (faces only) */}
//       {open && (
//         <ScrollArea className="mt-16 w-full h-full px-2">
//           <div className="flex flex-col gap-6 items-center">
//             {contacts.map((c, i) => (
//               <div key={i} className="relative">
//                 <Avatar className="h-12 w-12 cursor-pointer hover:scale-105 transition">
//                   <AvatarImage src="" />
//                   <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <Circle
//                   className={`h-3 w-3 absolute bottom-0 right-0 ${
//                     c.online ? "text-green-500 fill-green-500" : "text-red-500"
//                   }`}
//                 />
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
//       )}

//       {/* CLOSED STATE → faces + names + groups */}
//       {!open && (
//         <Card className="h-full border-none shadow-none rounded-none mt-14">
//           <CardContent className="p-4 flex flex-col h-full">
//             <h2 className="text-lg font-semibold mb-4">Contacts</h2>

//             <Input placeholder="Search..." className="mb-4" />

//             <ScrollArea className="pr-2">
//               <div className="space-y-4">
//                 {contacts.map((c, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-gray-100 transition"
//                   >
//                     <Avatar>
//                       <AvatarImage src="" />
//                       <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
//                     </Avatar>

//                     <div>
//                       <p className="text-sm font-medium">{c.name}</p>
//                     </div>

//                     <Circle
//                       className={`ml-auto h-3 w-3 ${
//                         c.online
//                           ? "text-green-500 fill-green-500"
//                           : "text-red-500"
//                       }`}
//                     />
//                   </div>
//                 ))}

//                 <div className="mt-4">
//                   <h3 className="text-sm font-semibold text-gray-600 mb-2">
//                     Groups
//                   </h3>

//                   {groups.map((g, i) => (
//                     <div
//                       key={i}
//                       className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-xl transition"
//                     >
//                       <Users className="h-5 w-5" />
//                       <span className="text-sm font-medium">{g}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </ScrollArea>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, Circle, ChevronLeft, ChevronRight } from "lucide-react";

export default function RightSideBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const contacts = [
    { name: "Frances Guerrero", online: true },
    { name: "Lori Ferguson", online: true },
    { name: "Samuel Bishop", online: false },
    { name: "Louis Crawford", online: true },
    { name: "Dennis Barrett", online: true },
    { name: "Judy Nguyen", online: true },
    { name: "Bryan Knight", online: false },
    { name: "Jacqueline Miller", online: true },
    { name: "Amanda Reed", online: true },
    { name: "Larry Lawson", online: false },
  ];

  const groups = ["Frances, Lori, ...", "Lawson, Knight"];

  return (
    <div
      className={`mr-4 fixed top-[76px] right-0 h-screen bg-card border-l border-border shadow-xl transition-all duration-300 z-40 flex flex-col
      ${isCollapsed ? "w-16" : "w-64"}`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 left-2 p-2 rounded-full border border-border bg-background shadow-md hover:bg-accent transition-colors z-10"
      >
        {isCollapsed ? (
          <ChevronLeft className="h-4 w-4 text-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-foreground" />
        )}
      </button>

      {isCollapsed ? (
        <ScrollArea className="mt-16 w-full h-full px-2">
          <div className="flex flex-col gap-4 items-center">
            {contacts.map((c, i) => (
              <div key={i} className="relative group">
                <Avatar className="h-10 w-10 cursor-pointer hover:scale-105 transition-transform ring-2 ring-border">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
                    {c.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Circle
                  className={`h-3 w-3 absolute bottom-0 right-0 ${
                    c.online
                      ? "text-green-500 fill-green-500"
                      : "text-muted fill-muted"
                  }`}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <Card className="h-full border-none shadow-none rounded-none mt-14 bg-transparent">
          <CardContent className="p-4 flex flex-col h-full">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Contacts
            </h2>

            <Input
              placeholder="Search..."
              className="mb-4 bg-background border-border"
            />

            <ScrollArea className="pr-2">
              <div className="space-y-2">
                {contacts.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-accent transition-colors"
                  >
                    <Avatar className="h-10 w-10 ring-2 ring-border">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
                        {c.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {c.name}
                      </p>
                    </div>

                    <Circle
                      className={`h-3 w-3 ${
                        c.online
                          ? "text-green-500 fill-green-500"
                          : "text-muted fill-muted"
                      }`}
                    />
                  </div>
                ))}

                <div className="mt-6 pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Groups
                  </h3>

                  {groups.map((g, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 cursor-pointer hover:bg-accent rounded-xl transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {g}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
