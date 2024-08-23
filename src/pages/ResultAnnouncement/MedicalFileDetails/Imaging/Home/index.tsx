import Card from "@/components/ui/Card"
import { Link } from "react-router-dom"

import styles from "./styles.module.css"
import { text } from "./text"
import brainMappingIcon from "@/assets/icons/brain-mapping.svg"
import entIcon from "@/assets/icons/ent.svg"
import ophthalmologyIcon from "@/assets/icons/ophthalmology.svg"
import comprehensiveHeartExaminationsIcon from "@/assets/icons/comprehensive-heart-examinations.svg"

const ImagingHome = () => {
  return (
    <div className={styles.container}>
      <Link to={"radiology"}>
        <Card title={text.radiology} headerIcon={brainMappingIcon} />
      </Link>

      <Link to={"sonography"}>
        <Card
          title={text.sonography}
          headerIcon={comprehensiveHeartExaminationsIcon}
        />
      </Link>

      <Link to={"densitometer"}>
        <Card title={text.densitometer} headerIcon={ophthalmologyIcon} />
      </Link>

      <Link to={"mammography"}>
        <Card title={text.mammography} headerIcon={entIcon} />
      </Link>
    </div>
  )
}

export default ImagingHome
