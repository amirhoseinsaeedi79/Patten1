import Card from "@/components/ui/Card"
import { Link } from "react-router-dom"

import styles from "./styles.module.css"
import { text } from "./text"

import sonographyIcon from "@/assets/icons/sonography.svg"

const SonographyHome = () => {
  return (
    <div className={styles.container}>
      <Link to={"belly-sonography"}>
        <Card title={text.bellySono} headerIcon={sonographyIcon} />
      </Link>

      <Link to={"pelvis-sonography"}>
        <Card title={text.pelvisSono} headerIcon={sonographyIcon} />
      </Link>

      <Link to={"breast-sonography"}>
        <Card title={text.breastSono} headerIcon={sonographyIcon} />
      </Link>

      <Link to={"vaginal-sonography"}>
        <Card title={text.vaginalSono} headerIcon={sonographyIcon} />
      </Link>

      <Link to={"thyroid-sonography"}>
        <Card title={text.thyroidSono} headerIcon={sonographyIcon} />
      </Link>

      <Link to={"doppler-sonography-neck-vessels"}>
        <Card title={text.doppNeckVesSono} headerIcon={sonographyIcon} />
      </Link>

      <Link to={"doppler-sonography-lower-limb-vessels"}>
        <Card title={text.doppLimVesSono} headerIcon={sonographyIcon} />
      </Link>
      <Link to={"testicle-sonography"}>
        <Card title={text.TesticleSonography} headerIcon={sonographyIcon} />
      </Link>
    </div>
  )
}

export default SonographyHome
