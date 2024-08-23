import { smartRequest } from "@/services";
import { IToken } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useMutationData = (jobId?: number, dataInfo?: IToken | FormData) =>
  useMutation({
    mutationKey: ["mutationKey", `${jobId}`],
    mutationFn: () => smartRequest(jobId, dataInfo), 
  });