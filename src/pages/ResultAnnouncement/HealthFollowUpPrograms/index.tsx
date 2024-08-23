import { useEffect, useState } from "react"

import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"
import { Toastify } from "@/components/ui/Toastify"
import { RCMDS_JobId_Get } from "@/constants/jobId"
import { smartRequest } from "@/services"

import { useMutation } from "@tanstack/react-query"

import styles from "./styles.module.css"
import { text } from "./text"

const HTMLRenderer: React.FC<{ html: string }> = ({ html }) => {
  // Render HTML content as string
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

const HealthFollowUpPrograms: React.FC = () => {
  const [recommendations, setRecommendations] = useState<
    Array<Record<string, string | null>>
  >([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  const pageSize = 6 // Number of rows per page

  // Calculate the range of data to display based on the current page
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, recommendations?.length)

  // State to track whether to show the iframe
  const [showIframe, setShowIframe] = useState(false)

  // State to track the selected key-value pair
  const [selectedKeyValue, setSelectedKeyValue] = useState<string | null>(
    String
  )

  // Function to handle clicking on "prev page" button
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Function to handle clicking on "next page" button
  const handleNextPage = () => {
    if (endIndex < recommendations?.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Function to handle hiding the iframe
  const handleHideIframe = () => {
    setShowIframe(false)
    setSelectedKeyValue(null)
  }
  const {
    mutate: recMutate,
    isError: recError,
    isSuccess: recSuccess,
  } = useMutation({
    mutationKey: ["Recommendations User Data", RCMDS_JobId_Get],
    mutationFn: async () => {
      const response = await smartRequest(RCMDS_JobId_Get)
      setRecommendations(response.data.data)
      return response.data.data
    },
  })

  useEffect(() => {
    // Trigger data fetching when component mounts
    recMutate()
  }, []) // Empty dependency array ensures it runs only once when component mounts

  const generateNumbers = () => {
    return recommendations.map((_, index) => index + 1)
  }

  return (
    <div className={styles.container}>
      <Toastify getError={recError} />
      <div>
        {showIframe && (
          <div>
            <Button buttonName="Hide Article" onClick={handleHideIframe} />
            <iframe
              title="HTML Article"
              srcDoc={selectedKeyValue!}
              style={{
                width: "100%",
                height: "500px",
                border: "1px solid black",
              }}
            />
          </div>
        )}

        {recSuccess && recommendations && (
          <div className={styles.contentTable}>
            <h2 className={styles.titlePage}>{text.title}</h2>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th scope="col" className={styles.tableHeaderFirstItem}>
                    {text.th1}
                  </th>
                  <th className={styles.tableHeaderItems}>{text.th2}</th>
                  <th className={styles.tableHeaderItems}>{text.th3}</th>
                  <th className={styles.tableHeaderItems}>{text.th4}</th>
                  <th className={styles.tableHeaderItems}>{text.th5}</th>
                  <th className={styles.tableHeaderItems}>{text.th6}</th>
                  <th className={styles.tableHeaderItemLast}>{text.th7}</th>
                </tr>
              </thead>
              <tbody>
                {recommendations
                  .slice(startIndex, endIndex)
                  .map((item, index) => (
                    <tr
                      key={startIndex + index}
                      className={styles.tableRowBody}
                    >
                      <td scope="row" className={styles.tableBodyItem}>
                        {generateNumbers()[startIndex + index]}
                      </td>
                      {/*ردیف*/}
                      <td className={styles.tableBodyItem}>
                        {item["1563189543362"]}
                      </td>
                      {/* برنامه مراقبتی */}
                      <td className={styles.tableBodyItem}>
                        {item["1563188430225"]}
                      </td>
                      {/* تاریخ شروع */}
                      <td className={styles.tableBodyItem}>
                        {item["1563344851600"]}
                      </td>
                      {/* مهلت انجام */}
                      <td className={styles.tableBodyItem}>
                        {item["1563344863535"]}
                      </td>
                      {/* عنوان */}
                      <td className={styles.tableBodyItem}>
                        <Button
                          buttonName="show"
                          onClick={() => {
                            setIsOpen(true)
                          }}
                        />
                      </td>
                      {isOpen && (
                        <Modal
                          isOpen={isOpen}
                          onClose={() => setIsOpen(false)}
                          className="w-4/6 h-[500px]"
                        >
                          <div className="w-full">
                            <HTMLRenderer html={item["1563188481330"]!} />
                          </div>
                        </Modal>
                      )}
                      {/* plan نمایش */}
                      <td className={styles.tableBodyItem}>
                        {item["1613987798968"]}
                      </td>
                      {/* وضعیت */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {recSuccess && recommendations && (
        <div className={styles.paginationContent}>
          <Button
            buttonName={text.Prev}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          />
          <span className={styles.numberPaginationContent}>{currentPage}</span>
          <Button
            buttonName={text.Next}
            onClick={handleNextPage}
            disabled={endIndex >= recommendations?.length}
          />
        </div>
      )}
    </div>
  )
}

export default HealthFollowUpPrograms
