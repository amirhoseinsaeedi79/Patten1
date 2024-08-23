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

const Pulmonologist = () => {
  const [pulData, setPulData] = useState<Record<string, string | null>>({})

  const {
    mutate: pulMutate,
    isError: pulError,
    isSuccess: pulSuccess,
  } = useMutation({
    mutationKey: ["Pulmonologist Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("Pulmonologist Data Response:", response.data.data);
      setPulData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    pulMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1690106617671"], // keys for Pulmonologist
  }

  // Extract the relevant keys for the Pulmonologist page
  const currentPageKeys = pageKeyMapping[1] // Assuming Pulmonologist page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = pulData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify id={40} getError={pulError} />
      <h1>{text.s1}</h1>
      {pulSuccess && (
        <div className={styles.bigContent}>
          <Textarea
            label={text.s2}
            value={currentPageData["1690106617671"]!}
            wrapperClassName={styles.fieldsStyles}
          />
        </div>
      )}
    </div>
  )
}

export default Pulmonologist
