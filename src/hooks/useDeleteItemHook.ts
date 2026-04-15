import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios/index";
import type { AxiosRequestConfig } from "axios";

interface IDeleteItemHook {
    url: string; 
    queryKey?: string[]; 
    config?: AxiosRequestConfig;
}

const useDeleteItemHook = ({ url, queryKey, config }: IDeleteItemHook) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string | number) => {
            const finalUrl = url.endsWith('/') ? `${url}${id}` : `${url}/${id}`;
            const response = await axiosInstance.delete(finalUrl, config);
            return response.data;
        },
        onSuccess: () => {
            if (queryKey) {
                queryClient.invalidateQueries({ queryKey });
            }
        },
    });
};

export default useDeleteItemHook;
