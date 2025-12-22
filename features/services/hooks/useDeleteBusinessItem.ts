import { useContext } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBusinessItem } from "../api";
import { useToast } from "@/lib/hooks/useToast";
import { AuthContext } from "@/lib/context/AuthState";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useDeleteBusinessItem = (businessId: string) => {
  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteBusinessItem,
    onSuccess: () => {
      showToast({
        message: "Delete Successful!",
        type: "success",
        duration: 8000,
        autoClose: true,
      });

      queryClient.invalidateQueries({
        queryKey: ["business info", businessId, userId],
      });
    },
    onError: (error) => {
      promiseErrorFunction(error, showToast);
    },
  });

  const handleSubmit = (itemId: string, itemType: string) => {
    mutate({ businessId, itemId, itemType });
  };

  return {
    isPending,
    handleDeleteBusinessItem: handleSubmit,
  };
};
