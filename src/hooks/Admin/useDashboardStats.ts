import UseGetDataQuery from "../useGetDataQuery";
import type { IDashboardStatsResponse } from "../../types";
import { useAuth } from "../Auth/useAuth";

export function useDashboardStats() {
  const { token } = useAuth();
  
  const query = UseGetDataQuery({
    queryKey: ["dashboardStats"],
    url: "/bookings/stats",
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return {
    ...query,
    data: query.data as IDashboardStatsResponse | undefined,
  };
}
