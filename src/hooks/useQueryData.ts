import { smartRequest } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useQueryData = (jobId?: number) => {
  return useQuery({
    queryKey: ["fetchData", `${jobId}`],
    queryFn: () => smartRequest(jobId),
  });
};