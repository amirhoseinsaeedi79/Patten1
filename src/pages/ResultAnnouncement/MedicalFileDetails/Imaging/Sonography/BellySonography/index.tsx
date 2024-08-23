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

const BellySonography = () => {
  const [bellyData, setBellyData] = useState<Record<string, string | null>>({})

  const {
    mutate: bellyMutate,
    isError: bellyError,
    isSuccess: bellySuccess,
  } = useMutation({
    mutationKey: ["BellySonography Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("BellySonography Data Response:", response.data.data);
      setBellyData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    bellyMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1560859413287", "1560859534222", "1560860378772"], // keys for BellySonography
  }

  // Extract the relevant keys for the BellySonography page
  const currentPageKeys = pageKeyMapping[1] // Assuming BellySonography page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = bellyData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify id={23} getError={bellyError} />
      <h1>{text.s1}</h1>
      {bellySuccess && (
        <div className={styles.bigContent}>
          <div className={styles.firstContent}>
            <p>{text.s2}</p>
            <div dir="ltr">
              {typeof currentPageData["1560859413287"] === "string" &&
                currentPageData["1560859413287"].trim() !== "" &&
                currentPageData["1560859413287"].includes("<") && (
                  <HTMLRenderer html={currentPageData["1560859413287"]} />
                )}
            </div>
          </div>
          <div className={styles.secondContent}>
            <p>{text.s3}</p>
            <a
              href={
                window.location.origin + `${currentPageData["1560859534222"]}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button buttonName={text.s4} />
            </a>
          </div>
          <div>
            <Textarea
              label={text.s5}
              value={currentPageData["1560860378772"]!}
              wrapperClassName={styles.fieldStyles}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default BellySonography
