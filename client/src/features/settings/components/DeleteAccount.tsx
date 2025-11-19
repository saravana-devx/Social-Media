import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const DeleteAccount: React.FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Card className="border border-border shadow-sm rounded-xl">
      <CardContent className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Delete account
          </h2>
          <p className="text-muted-foreground mt-1">
            He moonlights difficult engrossed it, sportsmen. Interested has all
            Devonshire difficulty gay assistance joy. Unaffected at ye of
            compliment alteration to.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Before you go…
          </h3>
          <ul className="text-muted-foreground text-sm list-disc ml-6 space-y-1">
            <li>
              Take a backup of your data{" "}
              <span className="text-primary hover:underline cursor-pointer">
                Here
              </span>
            </li>
            <li>If you delete your account, you will lose your all data.</li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="delete-check"
            checked={checked}
            onCheckedChange={(v: boolean) => setChecked(v)}
          />
          <label
            htmlFor="delete-check"
            className="text-sm text-foreground cursor-pointer select-none"
          >
            Yes, I’d like to delete my account
          </label>
        </div>

        <div className="flex gap-4 pt-3">
          <Button
            variant="outline"
            className="bg-green-50 text-green-700 hover:bg-green-100"
          >
            Keep my account
          </Button>

          <Button
            disabled={!checked}
            className="bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300"
          >
            Delete my account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeleteAccount;
