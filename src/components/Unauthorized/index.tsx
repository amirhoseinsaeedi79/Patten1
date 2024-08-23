import UnAuthPageSVG  from "@/assets/icons/unAuth.svg"
import { IUnauthorized } from "@/types"
import styles from "./styles.module.css"
import { text } from "./text"

const Unauthorized: React.FC<IUnauthorized> = ({
  statusCode,
  message,
}) => {
  return (
    <div className={styles.content}>
      <img src={UnAuthPageSVG} alt="Inaccessibility!" />
      <h1 className={styles.header}>{`${text.staticErrorTitle}`}</h1>
      <p className={styles.description}>{`${text.staticErrorMessage}`}</p>
      {statusCode && <h2 className={styles.header}>{statusCode}</h2>}
      {message && <p className={styles.description}>{message}</p>}
    </div>
  )
}

export default Unauthorized
