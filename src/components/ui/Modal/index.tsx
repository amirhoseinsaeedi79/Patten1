import { FC, MouseEvent } from "react"
import CloseButtonIcon from "@/assets/icons/close.svg"
import classNames from "classnames"
import styles from "./styles.module.css"
import { IModal } from "@/types/components"

export const Modal: FC<IModal> = ({
  isOpen,
  onClose,
  children,
  className,
  ...rest
}) => {
  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={handleClickOutside} {...rest}>
      <div className={classNames(styles.modal, className)}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            <img
              className={styles.closeIcon}
              src={CloseButtonIcon}
              alt="closeButton"
            />
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  )
}