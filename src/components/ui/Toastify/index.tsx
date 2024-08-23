import "react-toastify/dist/ReactToastify.css"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer, Zoom } from "react-toastify"
import styles from "./styles.module.css"
import { text } from "./text"
import { IToastify } from "@/types/components"

export const Toastify: React.FC<IToastify> = ({
  getError,
  postError,
  isSuccess,
  TextWarning,
}) => {
  const navigate = useNavigate()

  const showSuccessToastMessage = () => {
    toast.success(`${text.succeedSubmit}`, {
      position: "bottom-left",
      className: styles.successToast,
      autoClose: 1000,
      transition: Zoom,
      hideProgressBar: true,
      pauseOnHover: false,
      icon: false,
    })
  }

  const showErrorToastMessage = () => {
    toast.error(`${text.postErrorDescription}`, {
      position: "bottom-left",
      className: styles.errorToast,
      autoClose: 1000,
      transition: Zoom,
      hideProgressBar: true,
      pauseOnHover: false,
      icon: false,
    })
  }

  const showGetErrorToastMessage = () => {
    toast.error(`${text.getErrorDescription}`, {
      position: "bottom-left",
      className: styles.errorToast,
      autoClose: 1000,
      transition: Zoom,
      hideProgressBar: true,
      pauseOnHover: false,
      icon: false,
    })
  }

  useEffect(() => {
    const showWarningToastMessage = () => {
      toast.warn(`${TextWarning}`, {
        position: "top-center",
        className: styles.warningToast,
        autoClose: 2000,
        transition: Zoom,
        hideProgressBar: true,
        pauseOnHover: true,
        icon: false,
      })
    }
    if (getError) {
      showGetErrorToastMessage()
    } else if (postError) {
      showErrorToastMessage()
    } else if (isSuccess) {
      showSuccessToastMessage()
    } else if (TextWarning) {
      showWarningToastMessage()
    }
  }, [getError, postError, isSuccess, TextWarning, navigate])

  return (
    <>
      <ToastContainer />
    </>
  )
}
