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

const BreastSonography = () => {
  const [breastData, setBreastData] = useState<Record<string, string | null>>(
    {}
  )
  // const listValues = [
  //   "1547374786400",
  //   "15093",
  //   "15094",
  //   "15095",
  //   "15096",
  //   "15097",
  //   "15098",
  // ];

  const {
    mutate: breastMutate,
    isError: breastError,
    isSuccess: breastSuccess,
  } = useMutation({
    mutationKey: ["BreastSonography Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("BreastSonography Data Response:", response.data.data);
      setBreastData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    breastMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: [
      "1560769565983",
      "1562147145955",
      "1547374786400",
      "15093",
      "15094",
      "15095",
      "15096",
      "15097",
      "15098",
    ], // keys for BreastSonography
  }

  // Extract the relevant keys for the BreastSonography page
  const currentPageKeys = pageKeyMapping[1] // Assuming BreastSonography page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = breastData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1578722225129"]);

  return (
    <div className={styles.container}>
      <Toastify id={22} getError={breastError} />
      <h1>{text.s1}</h1>
      {breastSuccess && (
        <>
          <div className={styles.bigContent}>
            <Textarea
              label={text.s2}
              value={currentPageData["1560769565983"]!}
              wrapperClassName={styles.fieldsStyles}
            />
          </div>
          {currentPageKeys.slice(2, 9).map(
            (value) =>
              currentPageData[value] !== null && (
                <div className={styles.innerContent}>
                  <span>{text.statusBreastSonography}</span>
                  <label>
                    <input type="radio" value={currentPageData[value]!} />
                    <span>{currentPageData[value]}</span>
                  </label>
                </div>
              )
          )}
        </>
      )}

      <div className={styles.innerContent}></div>
    </div>
  )
}

export default BreastSonography
