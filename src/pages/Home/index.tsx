import  resultsAnnouncementIcon  from "@/assets/icons/results-announcement.svg";
import  uploadMedicalFilesIcon from "@/assets/icons/upload-medicalFiles.svg";

import Card from "@/components/ui/Card";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import { text } from "./text";

const Home = () => {
  return (
    <div className={styles.container}>
      <Link to={"/result-announcement"}>
        <Card
          title={text.resultAnnouncement}
          headerIcon={resultsAnnouncementIcon}
        />
      </Link>

      <Link to={"/upload-medical-files"}>
        <Card
          title={text.uploadMedicalFiles}
          headerIcon={uploadMedicalFilesIcon}
        />
      </Link>
    </div>
  );
};

export default Home;
