import { useState } from "react"
import classNames from "classnames"
import styles from "./styles.module.css"
import { Modal } from "@/components/ui"
import { text } from "./text"
import GuideIcon from "@/assets/icons/guide.svg"
import EducationalContentIcon from "@/assets/icons/educational-content.svg"
import { IButton } from "@/types/components"

export const Button: React.FC<IButton> = ({
  buttonName,
  fieldClassName,
  isLoading,
  guideContent,
  educationalContent,
  ...props
}) => {
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [isEducationalContentOpen, setIsEducationalContentOpen] =
    useState(false)

  return (
    <div className={styles.content}>
      <button
        className={classNames(styles.field, fieldClassName, {
          [`disabled`]: isLoading,
        })}
        {...props}
      >
        {!!guideContent && (
          <div>
            <div onClick={() => setIsGuideOpen(true)}>
              <img src={GuideIcon} alt="guideIcon" />
            </div>
            <Modal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)}>
              <div>{guideContent}</div>
            </Modal>
          </div>
        )}
        {buttonName}
      </button>
      {!!educationalContent && (
        <div className={styles.educationalContentWrapper}>
          <button
            type="button"
            className={styles.educationalContentButton}
            onClick={() => setIsEducationalContentOpen(true)}
          >
            <img src={EducationalContentIcon} alt="educationalContentIcon" />
            <p>{text.readMore}</p>
          </button>
          <Modal
            isOpen={isEducationalContentOpen}
            onClose={() => setIsEducationalContentOpen(false)}
          >
            <div>{educationalContent}</div>
          </Modal>
        </div>
      )}
    </div>
  )
}
