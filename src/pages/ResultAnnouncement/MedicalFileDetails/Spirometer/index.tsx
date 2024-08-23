import { useEffect, useState } from "react"

import { Button } from "@/components/ui/Button"
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

const Spirometer = () => {
  const [spiroData, setSpiroData] = useState<Record<string, string | null>>({})

  const {
    mutate: spiroMutate,
    isError: spiroError,
    isSuccess: spiroSuccess,
  } = useMutation({
    mutationKey: ["Ent Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("Recommendations Data Response:", response.data.data);
      setSpiroData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    spiroMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1561054157458", "1575124537056"], // keys for page 1
  }

  // Extract the relevant keys for the Spirometer page
  const currentPageKeys = pageKeyMapping[1] // Assuming Spirometer page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = spiroData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1561269936870"]);

  return (
    <div className={styles.container}>
      <Toastify getError={spiroError} />
      <h1>{text.s1}</h1>
      {spiroSuccess && (
        <div className={styles.content}>
          <div className={styles.innerContent}>
            <p>{text.s2}</p>
            <a
              href={
                window.location.origin + `${currentPageData["1561054157458"]}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button buttonName={text.s3} />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Spirometer
