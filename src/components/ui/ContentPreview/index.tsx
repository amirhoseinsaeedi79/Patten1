import { ButtonHTMLAttributes, ReactNode, useState } from "react"

import { Modal } from "@/components/ui"

interface ComponentsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string
  buttonClassName?: string
  data?: ReactNode
  icon: string
}

export const ContentPreview: React.FC<ComponentsProps> = ({
  buttonName,
  buttonClassName,
  data,
  icon,
  ...props
}) => {
  const [showContent, setShowContent] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowContent(true)}
        type="button"
        className={buttonClassName}
        {...props}
      >
        <img src={icon} alt={buttonName} />
        {buttonName}
      </button>
      <Modal isOpen={showContent} onClose={() => setShowContent(false)}>
        <div>{data}</div>
      </Modal>
    </>
  )
}
