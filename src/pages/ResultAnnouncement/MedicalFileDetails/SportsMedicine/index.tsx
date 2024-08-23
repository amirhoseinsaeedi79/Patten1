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

const SportsMedicine = () => {
  const [sportsData, setSportsData] = useState<Record<string, string | null>>(
    {}
  )

  const {
    mutate: sportsMutate,
    isError: sportsError,
    isSuccess: sportsSuccess,
  } = useMutation({
    mutationKey: ["SportsMedicine Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("SportsMedicine Data Response:", response.data.data);
      setSportsData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    sportsMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1578722225129", "1578722233108", "1579029765225", "1579029809832"], // keys for sportsMedicine
  }

  // Extract the relevant keys for the SportsMedicine page
  const currentPageKeys = pageKeyMapping[1] // Assuming SportsMedicine page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = sportsData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify getError={sportsError} />
      <h1>{text.s1}</h1>
      {sportsSuccess && (
        <div className={styles.content}>
          <Textarea
            label={text.s2}
            value={currentPageData["1578722225129"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <Textarea
            label={text.s5}
            value={currentPageData["1578722233108"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <Textarea
            label={text.s6}
            value={currentPageData["1579029765225"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <div className={styles.innerContent}>
            <p>{text.s4}</p>
            <button className={styles.buttonShow}>
              <a
                href={
                  window.location.origin + `${currentPageData["1579029809832"]}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {text.s3}
              </a>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SportsMedicine
