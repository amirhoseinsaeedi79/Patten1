import { useEffect, useState } from "react"

import { Toastify } from "@/components/ui/Toastify"
import { MFD_And_MFS_JobId_Get } from "@/constants/jobId"
import { smartRequest } from "@/services"

import { useMutation } from "@tanstack/react-query"

import styles from "./styles.module.css"
import { text } from "./text"

// Custom component to render HTML elements as strings

const HTMLRenderer: React.FC<{ html: string }> = ({ html }) => {
  // Render HTML content as string
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

const Neo = () => {
  const [neoData, setNeoData] = useState<Record<string, string | null>>({})

  const {
    mutate: neoMutate,
    isError: neoError,
    isSuccess: neoSuccess,
  } = useMutation({
    mutationKey: ["NEO Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("Nback Data Response:", response.data.data);
      setNeoData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    neoMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1558834209204"], // keys for SCL90
  }

  // Extract the relevant keys for the Neo page
  const currentPageKeys = pageKeyMapping[1] // Assuming Neo page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = neoData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify id={14} getError={neoError} />
      <h1>{text.s1}</h1>
      {neoSuccess && (
        <div className={styles.fieldsStyles}>
          {typeof currentPageData["1558834209204"] === "string" &&
            currentPageData["1558834209204"].trim() !== "" &&
            currentPageData["1558834209204"].includes("<") && (
              <HTMLRenderer
                html={currentPageData["1558834209204"].replace("/", "")}
              />
            )}
        </div>
      )}
    </div>
  )
}

export default Neo
