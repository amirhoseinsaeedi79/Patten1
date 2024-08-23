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

const Ent = () => {
  const [entData, setEntData] = useState<Record<string, string | null>>({})

  const {
    mutate: entMutate,
    isError: entError,
    isSuccess: entSuccess,
  } = useMutation({
    mutationKey: ["Ent Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("Recommendations Data Response:", response.data.data);
      setEntData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    entMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: [
      "17948",
      "17949",
      "17950",
      "1560680723609",
      "1560858315249",
      "1560858318882",
    ], // keys for page 1
  }

  // Extract the relevant keys for the Ent page
  const currentPageKeys = pageKeyMapping[1] // Assuming Ent page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = entData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1561269936870"]);

  return (
    <div className={styles.container}>
      <Toastify getError={entError} />
      <h1>{text.s1}</h1>
      {entSuccess && (
        <div className={styles.content}>
          <Textarea
            label={text.s2}
            value={currentPageData["17948"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <Textarea
            label={text.s3}
            value={currentPageData["1560680723609"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <Textarea
            label={text.s4}
            value={currentPageData["1560858315249"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <Textarea
            label={text.s5}
            value={currentPageData["1560858318882"]!}
            wrapperClassName={styles.fieldsStyles}
          />
        </div>
      )}
    </div>
  )
}

export default Ent
