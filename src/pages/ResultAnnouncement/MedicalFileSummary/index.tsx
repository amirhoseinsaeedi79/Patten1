import "./styles.module.css"

import { useEffect, useState } from "react"

import { Toastify } from "@/components/ui/Toastify"
import { MFD_And_MFS_JobId_Get } from "@/constants/jobId"
import { smartRequest } from "@/services"

import { useMutation } from "@tanstack/react-query"

// Custom component to render HTML elements as strings
const HTMLRenderer: React.FC<{ html: string }> = ({ html }) => {
  // Render HTML content as string
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

const MedicalFileSummary = () => {
  const [heartData, setHeartData] = useState<Record<string, string | null>>({})

  const {
    mutate: heartMutate,
    isError: heartError,
    isSuccess: heartSuccess,
  } = useMutation({
    mutationKey: ["Recommendations User Data", MFD_And_MFS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(MFD_And_MFS_JobId_Get)
      // console.log("Recommendations Data Response:", response.data.data);
      setHeartData(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    heartMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  // Define mapping between page numbers and keys
  const pageKeyMapping: { [key: number]: string[] } = {
    "1": ["14288"], // keys for page 1
    // Define keys for other pages accordingly
  }

  // Extract the relevant keys for the MedicalFileSummary page
  const currentPageKeys = pageKeyMapping["1"] // Assuming MedicalFileSummary page corresponds to index 1

  // console.log("currentPageKeys:", currentPageKeys);

  // Extract the data for the current page using the keys
  const currentPageData: { [key: string]: string | null | undefined } = {}
  try {
    currentPageKeys.forEach((key) => {
      currentPageData[key] = heartData[key]
      // console.log("This the heartData[key]", heartData[key]);
    })
  } catch (error) {
    console.log(error)
  }

  // console.log("currentPageData:", currentPageData["1561269936870"]);

  // console.log(currentPageData["1560577981847"]);

  return (
    <div>
      <Toastify getError={heartError} />
      {heartSuccess && (
        <div>
          {typeof currentPageData["14288"] === "string" &&
            currentPageData["14288"].trim() !== "" &&
            currentPageData["14288"].includes("<") && (
              <HTMLRenderer html={currentPageData["14288"]} />
            )}
        </div>
      )}
    </div>
  )
}

export default MedicalFileSummary
