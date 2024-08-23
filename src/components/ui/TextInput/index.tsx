import { forwardRef, useState } from "react"
import classNames from "classnames"
import { Modal } from "@/components/ui"
import { ITextInput } from "@/types/components"
import styles from "./styles.module.css"

import BarIcon from "@/assets/icons/bar.svg"
import GuideIcon from "@/assets/icons/guide.svg"

export const TextInput = forwardRef<HTMLInputElement, ITextInput>(
  (
    {
      label,
      labelClassName,
      inDivClassName,
      fieldClassName,
      unit,
      isError = false,
      guideContent,
      archiveContent,
      ...props
    },
    ref
  ) => {
    const [isGuideOpen, setIsGuideOpen] = useState(false)
    const [isArchiveOpen, setIsArchiveOpen] = useState(false)

    return (
      <div className={styles.content}>
        <label
          className={classNames(styles.label, labelClassName)}
          htmlFor={props.id}
        >
          {label}
        </label>
        <div className={classNames(styles.innerDivider, inDivClassName)}>
          <div className={styles.pos}>
            <input
              className={classNames(styles.field, fieldClassName, {
                [styles.fieldError]: isError,
              })}
              {...props}
              ref={ref}
            />
            {!!unit && <span className={styles.span}>{unit}</span>}
          </div>
          {!!guideContent && (
            <div>
              <button
                type="button"
                className={styles.button}
                onClick={() => setIsGuideOpen(true)}
              >
                <img src={GuideIcon} alt="guideIcon" />
              </button>
              <Modal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)}>
                <div>{guideContent}</div>
              </Modal>
            </div>
          )}
          {!!archiveContent && (
            <span>
              <button
                type="button"
                className={styles.button}
                onClick={() => setIsArchiveOpen(true)}
              >
                <img src={BarIcon} />
              </button>
              <Modal
                isOpen={isArchiveOpen}
                onClose={() => setIsArchiveOpen(false)}
              >
                <div>{archiveContent}</div>
              </Modal>
            </span>
          )}
        </div>
      </div>
    )
  }
)
