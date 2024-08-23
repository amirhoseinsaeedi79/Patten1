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

const Nback = () => {
  const [nbackData, setNbackData] = useState<Record<string, string | null>>({})

  const {
    mutate: nbackMutate,
    isError: nbackError,
    isSuccess: nbackSuccess,
  } = useMutation({
    mutationKey: ["NBACK Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("Nback Data Response:", response.data.data);
      setNbackData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    nbackMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1637324256894"], // keys for Nback
  }

  // Extract the relevant keys for the Nback page
  const currentPageKeys = pageKeyMapping[1] // Assuming Nback page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = nbackData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify id={13} getError={nbackError} />
      <h1>{text.s1}</h1>
      {nbackSuccess && (
        <div className={styles.content}>
          <Textarea
            label={text.s2}
            value={currentPageData["1637324256894"]!}
            wrapperClassName={styles.fieldsStyles}
          />
        </div>
      )}
    </div>
  )
}

export default Nback
