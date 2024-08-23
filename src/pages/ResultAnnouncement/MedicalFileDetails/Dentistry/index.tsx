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

const Dentistry = () => {
  const [dentalData, setDentalData] = useState<Record<string, string | null>>(
    {}
  )

  const {
    mutate: dentalMutate,
    isError: dentalError,
    isSuccess: dentalSuccess,
  } = useMutation({
    mutationKey: ["Dentistry Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("Recommendations Data Response:", response.data.data);
      setDentalData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    dentalMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: [
      "1560343507660",
      "1578722574644",
      "1578722579550",
      "1583138076623",
      "1583138741699",
    ], // keys for Dentistry
  }

  // Extract the relevant keys for the Dentistry page
  const currentPageKeys = pageKeyMapping[1] // Assuming Dentistry page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = dentalData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  return (
    <div className={styles.container}>
      <Toastify id={3} getError={dentalError} />
      <h1>{text.s1}</h1>
      {dentalSuccess && (
        <div className={styles.content}>
          <Textarea
            label={text.s2}
            value={currentPageData["1560343507660"]!?.replace(
              /(<|&lt;)br\s*\/*(>|&gt;)/g,
              ".                                                                                    "
            )}
            wrapperClassName={styles.fieldsStyles}
          />
          <Textarea
            label={text.s5}
            value={currentPageData["1578722579550"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <Textarea
            label={text.s6}
            value={currentPageData["1583138741699"]!}
            wrapperClassName={styles.fieldsStyles}
          />
          <div className={styles.innerContent}>
            <p>{text.s3}</p>
            <button className={styles.buttonShow}>
              <a
                href={
                  window.location.origin + `${currentPageData["1578722225129"]}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {text.s4}
              </a>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dentistry
