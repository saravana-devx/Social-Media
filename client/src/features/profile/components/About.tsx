// import { Card, CardContent } from "@/components/ui/card";
// import { Mail } from "lucide-react";

// const About = () => {
//   return (
//     <Card className="border-border shadow-lg">
//       <CardContent className="p-4">
//         <h2 className="text-lg font-bold mb-3 text-foreground">About</h2>
//         <p className="text-muted-foreground text-sm">
//           He moonlights difficult engrossed it, sportsmen. Interested has all
//           Devonshire difficulty gay assistance joy.
//         </p>
//         <div className="text-sm text-foreground space-y-2 mt-4">
//           <p>
//             <strong>Born:</strong> October 20, 1990
//           </p>
//           <p>
//             <strong>Status:</strong> Single
//           </p>
//           <p className="flex gap-2 items-center">
//             <Mail className="h-4 w-4 text-primary" /> example@abc.com
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default About;

import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useCurrentUserQuery } from "../hooks/useUserProfile";

const About = () => {
  const { data, isLoading } = useCurrentUserQuery();
  const user = data?.data;

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="border-border shadow-lg">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold mb-3 text-foreground">About</h2>

        <p className="text-muted-foreground text-sm">
          {user?.about || "No bio added yet."}
        </p>

        <div className="text-sm text-foreground space-y-2 mt-4">
          {user?.dob && (
            <p>
              <strong>Born:</strong> {new Date(user.dob).toDateString()}
            </p>
          )}

          {/* <p>
            <strong>Status:</strong> Single
          </p> */}

          <p className="flex gap-2 items-center">
            <Mail className="h-4 w-4 text-primary" />
            {user?.email}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default About;
