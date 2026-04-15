import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios/index";
import type { AxiosRequestConfig } from "axios";


interface IGetDataQuery {
    queryKey: string[];
    url: string;
    config?: AxiosRequestConfig;
    enabled?: boolean;
}

const UseGetDataQuery = ({ queryKey, url, config, enabled }: IGetDataQuery) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const response = await axiosInstance.get(url, config);
            return response.data;
        },
        enabled,
    });
};

export default UseGetDataQuery;
