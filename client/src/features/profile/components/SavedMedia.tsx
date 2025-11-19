import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SavedMedia = () => {
  return (
    <div className="space-y-4">
      <Card className="border-border shadow-lg">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-foreground">Photos</h2>
            <Button
              variant="ghost"
              className="text-primary hover:text-primary/80"
              size="sm"
            >
              See all
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="h-20 bg-muted rounded-lg"></div>
            <div className="h-20 bg-muted rounded-lg"></div>
            <div className="h-20 bg-muted rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedMedia;
