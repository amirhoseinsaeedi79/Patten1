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

const TesticleSonography = () => {
  const [testicleData, setTesticleData] = useState<
    Record<string, string | null>
  >({})

  const {
    mutate: testicleMutate,
    isError: testicleError,
    isSuccess: testicleSuccess,
  } = useMutation({
    mutationKey: ["TesticleSonography Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("TesticleSonography Data Response:", response.data.data);
      setTesticleData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    testicleMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    1: ["1685451347231"], // keys for TesticleSonography
  }

  // Extract the relevant keys for the TesticleSonography page
  const currentPageKeys = pageKeyMapping[1] // Assuming TesticleSonography page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = testicleData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1685451347231"]);

  return (
    <div className={styles.container}>
      <Toastify id={50} getError={testicleError} />
      <h1>{text.TesticleSonography}</h1>
      {testicleSuccess && (
        <div className={styles.bigContent}>
          <Textarea
            label={text.conclusion}
            value={currentPageData["1685451347231"]!}
          />
        </div>
      )}
    </div>
  )
}

export default TesticleSonography
