import { useEffect, useState } from "react"

import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/Textarea"
import { Toastify } from "@/components/ui/Toastify"
import { MFD_And_MFS_JobId_Get } from "@/constants/jobId"
import { smartRequest } from "@/services"

import { useMutation } from "@tanstack/react-query"

import styles from "./styles.module.css"
import { text } from "./text"

// Custom component to render HTML elements as strings
const HTMLRenderer: React.FC<{ html: string }> = ({ html }) => {
  // Render HTML content as string
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

const ComprehensiveHearthExamination = () => {
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
    1: [
      "17957",
      "1540636718052",
      "1540637127550",
      "1541415895661",
      "1541835069995",
      "1557112588288",
      "1557112594870",
      "1560585953599",
      "1560858605610",
      "1560858656241",
      "1561269911908",
      "1561269936870",
      "1561463653694",
      "1561887943898",
      "1561888048003",
      "1562481306908",
      "1562498197697",
      "1580535993224",
      "1560577981847",
      "13427",
      "1560585866092",
      "1561270079125",
    ], // keys for page 1
    // Define keys for other pages accordingly
  }

  // Extract the relevant keys for the ComprehensiveHearthExamination page
  const currentPageKeys = pageKeyMapping[1] // Assuming ComprehensiveHearthExamination page corresponds to index 1

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

  console.log(currentPageData["1560577981847"])

  return (
    <div className={styles.container}>
      <Toastify id={2} getError={heartError} />
      <h1>Specific Heart Exams</h1>
      {heartSuccess && (
        <div>
          <h1>{currentPageData["1540636718052"]}</h1>
          <div className={styles.secondContent}>
            {typeof currentPageData["1540637127550"] === "string" &&
              currentPageData["1540637127550"].trim() !== "" &&
              currentPageData["1540637127550"].includes("<") && (
                <HTMLRenderer
                  html={currentPageData["1540637127550"].replace(".", "")}
                />
              )}
          </div>

          <a
            href={window.location.origin + `${currentPageData["17957"]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center gap-2"
          >
            <h1>{text.q1}</h1>
            <Button buttonName={text.q7} />
          </a>

          <div className={styles.thirdContent}>
            <Textarea
              label={text.Diagnosis}
              value={currentPageData["1541415895661"]!}
              disabled
            />

            <Textarea
              label={text.q2}
              value={currentPageData["1541835069995"]!}
              disabled
            />

            <Textarea
              label={text.q4}
              value={currentPageData["1561269911908"]!}
              disabled
            />

            <Textarea
              label={text.q5}
              value={currentPageData["1560858605610"]!}
              disabled
            />

            <Textarea
              label={text.cBp}
              value={currentPageData["1557112594870"]!}
              disabled
            />

            <a
              href={
                window.location.origin + `${currentPageData["1561888048003"]}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{text.bP}</span>
              <Button buttonName={text.q7} />
            </a>

            <Textarea
              label={text.cHr}
              value={currentPageData["1557112588288"]!}
              disabled
            />
            <a
              href={
                window.location.origin + `${currentPageData["1561887943898"]}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{text.hr}</span>
              <Button buttonName={text.q7} />
            </a>

            <Textarea
              label={text.q5}
              value={currentPageData["1561269936870"]!}
              disabled
            />

            <Textarea
              label={text.q6}
              value={currentPageData["1561463653694"]!}
              disabled
            />

            {currentPageData["1560858656241"] !== undefined && (
              <div className={styles.innerContent}>
                <Textarea
                  label={text.conclusion}
                  value={currentPageData["1560858656241"]!}
                />
              </div>
            )}
            {currentPageKeys.slice(18, 22).map(
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
            <a
              href={
                window.location.origin + `${currentPageData["1580535993224"]}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{text.sH}</span>
              <Button buttonName={text.q7} />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComprehensiveHearthExamination
