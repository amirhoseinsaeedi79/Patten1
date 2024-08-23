import { useEffect, useState } from "react"

import { Textarea } from "@/components/ui/Textarea"
import { Toastify } from "@/components/ui/Toastify"
import { MFD_And_MFS_JobId_Get } from "@/constants/jobId"
import { smartRequest } from "@/services"

import { useMutation } from "@tanstack/react-query"

import styles from "./styles.module.css"
import { text } from "./text"

// // Custom component to render HTML elements as strings
// const HTMLRenderer: React.FC<{ html: string }> = ({ html }) => {
//   // Render HTML content as string
//   return <div dangerouslySetInnerHTML={{ __html: html }} />;
// };

const BrainMapping = () => {
  const [brainData, setBrainData] = useState<Record<string, string | null>>({})

  const {
    mutate: brainMutate,
    isError: brainError,
    isSuccess: brainSuccess,
  } = useMutation({
    mutationKey: ["BrainMapping Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("BrainMapping Data Response:", response.data.data);
      setBrainData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    brainMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1559086083543", "1559086156086", "1559086219404", "1560933409145"], // keys for BrainMapping
  }

  // Extract the relevant keys for the BrainMapping page
  const currentPageKeys = pageKeyMapping[1] // Assuming BrainMapping page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = brainData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify id={8} getError={brainError} />
      <h1>{text.s1}</h1>
      {brainSuccess && (
        <div className={styles.content}>
          <Textarea
            label={text.s2}
            value={currentPageData["1559086083543"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <Textarea
            label={text.s5}
            value={currentPageData["1559086219404"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <Textarea
            label={text.s6}
            value={currentPageData["1560933409145"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <div className={styles.innerContent}>
            <p>{text.s3}</p>
            <button className={styles.buttonShow}>
              <a
                href={
                  window.location.origin + `${currentPageData["1579029809832"]}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {text.s4}
              </a>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BrainMapping
