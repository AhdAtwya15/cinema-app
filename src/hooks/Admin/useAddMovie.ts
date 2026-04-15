import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/CustomToast";
import axiosInstance from "../../axios";
import { AxiosError } from "axios";
import type { IAddMoviePayload, IPhotoFile } from "../../types";
import { useAuth } from "../Auth/useAuth";


export function useAddMovie(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async (fullData: IAddMoviePayload) => {

      const formData = new FormData();

      (Object.keys(fullData) as (keyof IAddMoviePayload)[]).forEach((key) => {
        const value = fullData[key];

        if (key === "poster") {
          if (value) formData.append(key, value as File);
        } else if (["castPhotos", "directorPhotos", "producerPhotos"].includes(key) && Array.isArray(value)) {
          (value as IPhotoFile[]).forEach((photoObj) => {
            if (photoObj.file) {
              formData.append(key, photoObj.file);
            }
          });
        } else if (key === "seatPrices" || key === "slots" || Array.isArray(value)) {
          if (value) formData.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });


      const { data } = await axiosInstance.post("/movies", formData,{
        headers:{
        Authorization:`Bearer ${token}`
      }});

      return data;
    },
    onSuccess: (data) => {

      if (data.debug) {
        console.log("Server received files:", data.debug);
      }
      showToast.success(data.message || "Movie added successfully!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as { message?: string })?.message || "Failed to add movie. Please try again.";
      showToast.error(errorMessage);
    },
  });
}
