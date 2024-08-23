import { forwardRef, useState } from "react"
import classNames from "classnames"
import { Modal } from "@/components/ui"
import { text } from "./text"

import GuideIcon from "@/assets/icons/guide.svg"
import EducationalContentIcon from "@/assets/icons/educational-content.svg"
import { IRadioButton } from "@/types/components"
import styles from "./styles.module.css"

export const RadioButton = forwardRef<HTMLInputElement, IRadioButton>(
  (
    {
      label,
      labelClassName,
      fieldClassName,
      options,
      guideContent,
      educationalContent,
      ...props
    },
    ref
  ) => {
    const [isGuideOpen, setIsGuideOpen] = useState(false)
    const [isEducationalContentOpen, setIsEducationalContentOpen] =
      useState(false)

    return (
      <div className={styles.content}>
        <div className={styles.questionContent}>
          <label
            className={classNames(styles.label, labelClassName)}
            htmlFor={props.id}
          >
            {label}
          </label>
          {!!guideContent && (
            <div className={styles.guideContent}>
              <button
                type="button"
                className={styles.guideContentButton}
                onClick={() => setIsGuideOpen(true)}
              >
                <img src={GuideIcon} alt="guideIcon" />
              </button>
              <Modal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)}>
                <div>{guideContent}</div>
              </Modal>
            </div>
          )}
        </div>
        <div className={classNames(styles.radioContent, fieldClassName)}>
          {options.map((option, index) => (
            <label className={styles.radioLabel} key={index}>
              <input
                className={styles.radioInput}
                type="radio"
                value={option.value}
                {...props}
                ref={ref}
              />
              <span className={styles.radioSpan}>{option.label}</span>
            </label>
          ))}
        </div>
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
)
