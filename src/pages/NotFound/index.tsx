import ErrorPageIcon from "@/assets/icons/error-page.svg"
import { IErrorPage } from "@/types"
import styles from "./styles.module.css"
import { text } from "./text"

const ErrorPage: React.FC<IErrorPage> = ({ statusCode, message }) => {
  return (
    <div className={styles.content}>
      <img src={ErrorPageIcon} alt="Not Found!" />
      <h1 className={styles.header}>{`${text.staticErrorTitle}`}</h1>
      <p className={styles.description}>{`${text.staticErrorMessage}`}</p>
      {statusCode && <h2 className={styles.header}>{statusCode}</h2>}
      {message && <p className={styles.description}>{message}</p>}
    </div>
  )
}

export default ErrorPage
