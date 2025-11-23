import { ProfileAPI } from "@/features/profile/api/profile.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EditProfilePayload } from "../validation";
import { toast } from "sonner";
import { handleAxiosError } from "@/utils";

export const useUpdateProfileMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditProfilePayload) =>
      ProfileAPI.updateProfileDetails(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Profile updated!");
    },
    onError: handleAxiosError,
  });
};
