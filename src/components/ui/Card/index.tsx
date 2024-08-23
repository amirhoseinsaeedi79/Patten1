import leftArrow from "@/assets/icons/left-arrow.svg";

import styles from "./styles.module.css";

interface IProps {
  title: string;
  headerIcon: string;
}

const Card: React.FC<IProps> = ({ title, headerIcon }) => {
  return (
    <div className={styles.container}>
      <img src={headerIcon} />
      <div className={styles.content}>
        <h2>{title}</h2>
        <img src={leftArrow} />
      </div>
    </div>
  );
};

export default Card;
