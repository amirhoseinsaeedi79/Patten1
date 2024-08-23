import { useEffect, useState } from "react"

import { Button } from "@/components/ui/Button"
import { Toastify } from "@/components/ui/Toastify"
import { MFD_And_MFS_JobId_Get } from "@/constants/jobId"
import { smartRequest } from "@/services"

import { useMutation } from "@tanstack/react-query"

import styles from "./styles.module.css"
import { text } from "./text"

// // Custom component to render HTML elements as strings
const HTMLRenderer: React.FC<{ html: string }> = ({ html }) => {
  // Render HTML content as string
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

const Densitometer = () => {
  const [densData, setDensData] = useState<Record<string, string | null>>({})

  const {
    mutate: densMutate,
    isError: densError,
    isSuccess: densSuccess,
  } = useMutation({
    mutationKey: ["Densitometer Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("Densitometer Data Response:", response.data.data);
      setDensData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    densMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1555720708304", "1556512276787", "1560670151217"], // keys for Densitometer
  }

  // Extract the relevant keys for the Densitometer page
  const currentPageKeys = pageKeyMapping[1] // Assuming Densitometer page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = densData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify getError={densError} />
      <h1>{currentPageData["1555720708304"]}</h1>
      {densSuccess && (
        <div className={styles.bigContent}>
          <div className={styles.secondContent}>
            <p>{text.s3}</p>
            <div dir="ltr">
              {typeof currentPageData["1560670151217"] === "string" &&
                currentPageData["1560670151217"].trim() !== "" &&
                currentPageData["1560670151217"].includes("<") && (
                  <HTMLRenderer html={currentPageData["1560670151217"]} />
                )}
            </div>
          </div>
          <div className={styles.firstContent}>
            <p>{text.s1}</p>
            <a
              href={
                window.location.origin + `${currentPageData["1556512276787"]}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button buttonName={text.s2} />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Densitometer
