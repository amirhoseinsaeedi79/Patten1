import { forwardRef, useState } from "react"
import classNames from "classnames"
import { Modal } from "@/components/ui"
import { ISelectOption } from "@/types/components"
import styles from "./styles.module.css"
import GuideIcon from "@/assets/icons/guide.svg"
import { text } from "./text"


export const SelectOption = forwardRef<HTMLSelectElement, ISelectOption>(
  (
    {
      label,
      labelClassName,
      fieldClassName,
      optionClassName,
      options,
      isError,
      educationalContent,
      guideContent,
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
        <select
          className={classNames(styles.field, fieldClassName, {
            [styles.fieldError]: isError,
          })}
          ref={ref}
          {...props}
        >
          <option className="text-sm leading-5" value="">
            {text.selectValue}
          </option>
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className={classNames(styles.options, optionClassName)}
            >
              {option.label}
            </option>
          ))}
        </select>
        {!!educationalContent && (
          <div className={styles.educationalContentWrapper}>
            <button
              type="button"
              className={styles.educationalContentButton}
              onClick={() => setIsEducationalContentOpen(true)}
            >
              ArchiveIcon
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
