import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isLoading: settingLoad } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("setting updated successfully");
      // reset();
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () => toast.error("cabin has not been Edited"),
  });

  return { updateSetting, settingLoad };
}
