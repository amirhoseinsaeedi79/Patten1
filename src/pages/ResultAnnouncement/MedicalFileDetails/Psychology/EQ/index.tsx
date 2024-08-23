import React, { useEffect, useState } from "react"

import { Toastify } from "@/components/ui/Toastify"
import { MFD_And_MFS_JobId_Get } from "@/constants/jobId"
import { smartRequest } from "@/services"

import { useMutation } from "@tanstack/react-query"

import styles from "./styles.module.css"
import { text } from "./text"

// Custom component to render HTML elements as strings
const HTMLRenderer: React.FC<{ html: string }> = ({ html }) => {
  // Render HTML content as string
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={styles.fieldsStyles}
    />
  )
}

const Eq = () => {
  const [eqData, setEqData] = useState<Record<string, string | null>>({})

  const {
    mutate: eqMutate,
    isError: eqError,
    isSuccess: eqSuccess,
  } = useMutation({
    mutationKey: ["EQ Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("EQ Data Response:", response.data.data);
      setEqData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    eqMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1559019080792"], // keys for Eq
  }

  // Extract the relevant keys for the Eq page
  const currentPageKeys = pageKeyMapping[1] // Assuming Eq page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = eqData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify id={9} getError={eqError} />
      <h1>{text.s1}</h1>
      {eqSuccess && (
        <div className={styles.content}>
          <div className={styles.fieldsStyles}>
            {typeof currentPageData["1559019080792"] === "string" &&
              currentPageData["1559019080792"].trim() !== "" &&
              currentPageData["1559019080792"].includes("<") && (
                <HTMLRenderer
                  html={currentPageData["1559019080792"].replace("/", "")}
                />
              )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Eq
