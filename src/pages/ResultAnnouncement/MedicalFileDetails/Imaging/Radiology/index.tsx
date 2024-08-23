import { useEffect, useState } from "react"

import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/Textarea"
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

const Radiology = () => {
  const [radioData, setRadioData] = useState<Record<string, string | null>>({})

  const {
    mutate: radioMutate,
    isError: radioError,
    isSuccess: radioSuccess,
  } = useMutation({
    mutationKey: ["Radiology Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("Radiology Data Response:", response.data.data);
      setRadioData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    radioMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1560585112512", "1560663762337", "1560857487818"], // keys for Radiology
  }

  // Extract the relevant keys for the Radiology page
  const currentPageKeys = pageKeyMapping[1] // Assuming Radiology page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = radioData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify id={19} getError={radioError} />
      <h1>{text.s1}</h1>
      {radioSuccess && (
        <div className={styles.bigContent}>
          <div>
            <p>{text.s2}</p>
            <div dir="ltr" className={styles.firstContent}>
              {typeof currentPageData["1560585112512"] === "string" &&
                currentPageData["1560585112512"].trim() !== "" &&
                currentPageData["1560585112512"].includes("<") && (
                  <HTMLRenderer html={currentPageData["1560585112512"]} />
                )}
            </div>
          </div>
          <div className={styles.secondContent}>
            <p>{text.s3}</p>
            <a
              href={
                window.location.origin + `${currentPageData["1560663762337"]}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button buttonName={text.s4} />
            </a>
          </div>
          <Textarea label={text.s5} value={currentPageData["1560857487818"]!} />

          {currentPageData["10868"] !== undefined && (
            <div className={styles.innerContent}>
              <Textarea
                label={text.normal}
                value={`${currentPageData["10868"]}`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Radiology
