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
// const HTMLRenderer: React.FC<{ html: string }> = ({ html }) => {
//   // Render HTML content as string
//   return <div dangerouslySetInnerHTML={{ __html: html }} />;
// };

const FoodAndDiet = () => {
  const [fooDietData, setFooDietData] = useState<Record<string, string | null>>(
    {}
  )

  const {
    mutate: fooDietMutate,
    isError: fooDietError,
    isSuccess: fooDietSuccess,
  } = useMutation({
    mutationKey: ["FoodAndDiet Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("Nback Data Response:", response.data.data);
      setFooDietData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    fooDietMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1683922339204", "1683922351531"], // keys for SCL90
  }

  // Extract the relevant keys for the Bart page
  const currentPageKeys = pageKeyMapping[1] // Assuming Ent page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}

  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = fooDietData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify getError={fooDietError} />
      <h1>{text.s1}</h1>
      {fooDietSuccess && (
        <div className={styles.content}>
          <div>
            <Textarea
              label={text.s2}
              value={currentPageData["1683922339204"]!}
              wrapperClassName={styles.fieldsStyles}
            />
          </div>
          <div className={styles.innerContent}>
            <p>{text.s3}</p>
            <a
              href={
                window.location.origin + `${currentPageData["1683922351531"]}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button buttonName={text.s4} />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default FoodAndDiet
