import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";

import healthFollowUpProgramsIcon from "@/assets/icons/health-followUp-programs.svg";
import medicalFileDetailsIcon from "@/assets/icons/health-followUp-programs.svg";
import medicalFileSummaryIcon from "@/assets/icons/health-followUp-programs.svg";
import recommendationsIcon from "@/assets/icons/health-followUp-programs.svg";

import styles from "./styles.module.css";
import { text } from "./text";

const ResultAnnouncementHome = () => {
  return (
    <div className={styles.container}>
      <Link to={"medical-file-details"}>
        <Card
          title={text.medicalFileDetails}
          headerIcon={medicalFileDetailsIcon}
        />
      </Link>

      <Link to={"medical-file-summary"}>
        <Card
          title={text.medicalFileSummary}
          headerIcon={medicalFileSummaryIcon}
        />
      </Link>

      <Link to={"health-followUp-programs"}>
        <Card
          title={text.healthFollowUpPrograms}
          headerIcon={healthFollowUpProgramsIcon}
        />
      </Link>

      <Link to={"recommandations"}>
        <Card title={text.recommendations} headerIcon={recommendationsIcon} />
      </Link>
    </div>
  );
};

export default ResultAnnouncementHome;
