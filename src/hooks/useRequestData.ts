import { smartRequest } from "@/services";
import { useState } from "react";

export const useRequest = (jobId?: number, dataInfo?: object | FormData) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState();

  smartRequest(jobId, dataInfo)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      if (response.data.error === false) {
        setIsSuccess(true);
        setData(response.data.data);
        localStorage.setItem("userInfo", response.data.data);
      } else {
        setIsError(true);
      }
    })
    .catch((error) => {
      setIsError(true);
      setErrorMessage(error?.message);
    })
    .finally(() => {
      setIsLoading(false);
    });

  return { data, isSuccess, isLoading, isError, errorMessage };
};