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

const Ophthalmology = () => {
  const [ophthalData, setOphthalData] = useState<Record<string, string | null>>(
    {}
  )

  const {
    mutate: ophthalMutate,
    isError: ophthalError,
    isSuccess: ophthalSuccess,
  } = useMutation({
    mutationKey: ["Ophthalmology Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("Recommendations Data Response:", response.data.data);
      setOphthalData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    ophthalMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: [
      "1556329975115",
      "1560599602829",
      "1560599619571",
      "1560751640573",
      "1560858513126",
    ], // keys for page 1
  }

  // Extract the relevant keys for the Ophthalmology page
  const currentPageKeys = pageKeyMapping[1] // Assuming Ophthalmology page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = ophthalData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1561269936870"]);

  return (
    <div className={styles.container}>
      <Toastify getError={ophthalError} />
      <h1>{text.s1}</h1>
      {ophthalSuccess && (
        <div className={styles.content}>
          <Textarea
            label={text.s1}
            value={currentPageData["1560599602829"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <Textarea
            label={text.s2}
            value={currentPageData["1560599619571"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <Textarea
            label={text.s3}
            value={currentPageData["1560751640573"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <Textarea
            label={text.s4}
            value={currentPageData["1560858513126"]!}
            wrapperClassName={styles.fieldsStyles}
          />
        </div>
      )}
    </div>
  )
}

export default Ophthalmology
