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

const Mammography = () => {
  const [mamData, setMamData] = useState<Record<string, string | null>>({})

  const {
    mutate: mamMutate,
    isError: mamError,
    isSuccess: mamSuccess,
  } = useMutation({
    mutationKey: ["Mammography Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("Mammography Data Response:", response.data.data);
      setMamData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    mamMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: [
      "1545823424115",
      "1547361255131",
      "1547374786400",
      "15093",
      "15094",
      "15095",
      "15096",
      "15097",
      "15098",
      "1549283835711",
      "1549283968634",
      "1549284339524",
      "1549284429370",
      "1549284457867",
    ], // keys for Mammography
  }

  // Extract the relevant keys for the Mammography page
  const currentPageKeys = pageKeyMapping[1] // Assuming Mammography page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = mamData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  return (
    <div className={styles.container}>
      <Toastify getError={mamError} />
      <h1>{text.s1}</h1>
      {mamSuccess && (
        <div className={styles.bigContent}>
          <Textarea
            label={text.s4}
            value={currentPageData["1545823424115"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <div className={styles.firstContent}>
            <p>{text.s2}</p>
            <a
              href={
                window.location.origin + `${currentPageData["1556512276787"]}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button buttonName={text.s3} />
            </a>
          </div>
          {currentPageKeys.slice(2, 15).map(
            (value) =>
              currentPageData[value] !== null && (
                <div className={styles.innerContent}>
                  <span>{text.statusMammography}</span>
                  <label>
                    <input type="radio" value={currentPageData[value]!} />
                    <span>{currentPageData[value]}</span>
                  </label>
                </div>
              )
          )}

          {currentPageKeys.slice(9, 15).map(
            (value) =>
              currentPageData[value] !== null && (
                <div className={styles.innerContent}>
                  <span>{text.result}</span>
                  <label>
                    <input type="radio" value={currentPageData[value]!} />
                    <span>{currentPageData[value]}</span>
                  </label>
                </div>
              )
          )}
        </div>
      )}
    </div>
  )
}

export default Mammography
