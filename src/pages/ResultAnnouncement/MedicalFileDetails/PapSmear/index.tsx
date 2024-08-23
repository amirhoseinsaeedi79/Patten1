import { useEffect, useState } from "react"

import { Button } from "@/components/ui/Button"
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

const PapSmear = () => {
  const [papData, setPapData] = useState<Record<string, string | null>>({})

  const {
    mutate: papMutate,
    isError: papError,
    isSuccess: papSuccess,
  } = useMutation({
    mutationKey: ["PapSmear Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("PapSmear Data Response:", response.data.data);
      setPapData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    papMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1575363104372"], // keys for PapSmear
  }

  // Extract the relevant keys for the PapSmear page
  const currentPageKeys = pageKeyMapping[1] // Assuming PapSmear page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = papData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify id={32} getError={papError} />
      <h1>{text.s1}</h1>
      {papSuccess && (
        <div className={styles.content}>
          <div className={styles.innerContent}>
            <p>{text.s2}</p>
            <a
              href={
                window.location.origin + `${currentPageData["1575363104372"]}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button buttonName={text.s3} />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default PapSmear
