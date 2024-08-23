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

const PelvisSonography = () => {
  const [pelvisData, setPelvisData] = useState<Record<string, string | null>>(
    {}
  )

  const {
    mutate: pelvisMutate,
    isError: pelvisError,
    isSuccess: pelvisSuccess,
  } = useMutation({
    mutationKey: ["PelvisSonography Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("PelvisSonography Data Response:", response.data.data);
      setPelvisData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    pelvisMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1560859428522", "1560859621138", "1560860404174"], // keys for PelvisSonography
  }

  // Extract the relevant keys for the PelvisSonography page
  const currentPageKeys = pageKeyMapping[1] // Assuming PelvisSonography page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = pelvisData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify id={25} getError={pelvisError} />
      <h1>{text.s1}</h1>
      {pelvisSuccess && (
        <div className={styles.bigContent}>
          <div className={styles.firstContent}>
            <p>{text.s2}</p>
            <div dir="ltr">
              {typeof currentPageData["1560859428522"] === "string" &&
                currentPageData["1560859428522"].trim() !== "" &&
                currentPageData["1560859428522"].includes("<") && (
                  <HTMLRenderer html={currentPageData["1560859428522"]} />
                )}
            </div>
          </div>
          <div className={styles.secondContent}>
            <p>{text.s3}</p>
            <a
              href={
                window.location.origin + `${currentPageData["1560859621138"]}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button buttonName={text.s4} />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default PelvisSonography
