import { useEffect, useState } from "react"

import { Toastify } from "@/components/ui/Toastify"
import { MFD_And_MFS_JobId_Get } from "@/constants/jobId"
import { smartRequest } from "@/services"

import { useMutation } from "@tanstack/react-query"

import styles from "./styles.module.css"
import { text } from "./text"

//  Custom component to render HTML elements as strings
const HTMLRenderer: React.FC<{ html: string }> = ({ html }) => {
  // Render HTML content as string
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

const Scl90 = () => {
  const [scl90Data, setScl90Data] = useState<Record<string, string | null>>({})

  const {
    mutate: scl90Mutate,
    isError: scl90Error,
    isSuccess: scl90Success,
  } = useMutation({
    mutationKey: ["SCL90 Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("Scl90 Data Response:", response.data.data);
      setScl90Data(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    scl90Mutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1558143614547"], // keys for SCL90
  }

  // Extract the relevant keys for the Scl90 page
  const currentPageKeys = pageKeyMapping[1] // Assuming Scl90 page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = scl90Data[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify id={15} getError={scl90Error} />
      <h1>{text.s1}</h1>
      {scl90Success && (
        <div className={styles.fieldsStyles}>
          {typeof currentPageData["1558143614547"] === "string" &&
            currentPageData["1558143614547"].trim() !== "" &&
            currentPageData["1558143614547"].includes("<") && (
              <HTMLRenderer
                html={currentPageData["1558143614547"].replace("/", "")}
              />
            )}
        </div>
      )}
    </div>
  )
}

export default Scl90
