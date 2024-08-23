import React from "react"

import backgroundImage from "@/assets/images/background.jpg"
// import Unauthorized from "@/components/Unauthorized";
// import Loading from "@/components/loading";
// import { AUTH_JobId } from "@/constants/jobId";
import { Outlet } from "react-router-dom"
// import { smartRequest } from "@/services";
// import { IToken } from "@/types";

// import { useMutation } from "@tanstack/react-query";

import styles from "./styles.module.css"

const ENasim: React.FC = () => {
  // JUST IN DEVELOPMENT MODE

  //the new right token:
  const token =
    "ndjihdbyhshkpxehxaqgplyhpctiwjbnbqaerjetrlemeswythfoscmfvxnmwbqfdksqsksonigjnwnetyhowilvhrcydovc"
  localStorage.setItem("token", token)

  // JUST IN DEVELOPMENT MODE

  // const [isAuthorized, setIsAuthorized] = useState(null);
  // const {
  //   mutate,
  //   // isPending: isLoading,
  //   // isError,
  //   // error,
  // } = useMutation({
  //   mutationKey: ["postUserData", AUTH_JobId],
  //   mutationFn: (dataInfo: IToken) => smartRequest(AUTH_JobId, dataInfo),
  //   onSuccess: (data) => {
  //     localStorage.setItem("token", data.token);
  //     if (data.error === false) {
  //       //@ts-expect-error explain
  //       setIsAuthorized(true);
  //       localStorage.setItem("userData", JSON.stringify(data.data));
  //     } else {
  //       //@ts-expect-error explain
  //       setIsAuthorized(false);
  //     }
  //   },
  // });

  // useEffect(() => {
  //   const handlePostMessage = (e: MessageEvent) => {
  //     const data = e.data;

  //     if (data.tip === "getToken") {
  //       const oToken = data.token;
  //       if (oToken) {
  //         localStorage.setItem("oToken", oToken);
  //         const data = { token: oToken };
  //         mutate(data);
  //       }
  //     }
  //   };

  //   window.parent.postMessage({ tip: "getToken" }, "https://asa.davisco.ir");
  //   window.addEventListener("message", handlePostMessage, false);

  //   return () => {
  //     window.removeEventListener("message", handlePostMessage);
  //     localStorage.removeItem("oToken");
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("userData");
  //   };
  // }, []);

  // // if (isError) {
  // //   return <ErrorPage message={error.message || "Server Error"} />;
  // // }

  // if (isAuthorized === false) {
  //   return <Unauthorized />;
  // } else if (isAuthorized === true) {
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* <div className={styles.heading}>
        {userData.last_update_time && (
            <p className={styles.date}>{userData.last_update_time} </p>
          )}
      </div> */}
      <Outlet />
    </div>
  )
  // } else {
  //   return <Loading />;
  // }
}

export default ENasim
