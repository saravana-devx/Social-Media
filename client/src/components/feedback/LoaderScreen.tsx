import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LoaderScreenProps {
  message?: string;
}

const LoaderScreen: React.FC<LoaderScreenProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin text-primary mr-4" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default LoaderScreen;
