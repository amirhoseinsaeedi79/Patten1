import Card from "@/components/ui/Card";

import brainMappingIcon from "@/assets/icons/brain-mapping.svg";
import comprehensiveHeartExaminationsIcon from "@/assets/icons/comprehensive-heart-examinations.svg";
import dentistryIcon from "@/assets/icons/dentistry.svg";
import digestionIcon from "@/assets/icons/Digestion.svg";
import entIcon from "@/assets/icons/ent.svg";
import imagingIcon from "@/assets/icons/imaging.svg";
import internalIcon from "@/assets/icons/internal.svg";
import lungIcon from "@/assets/icons/lung.svg";
import medicineTestIcon from "@/assets/icons/medicine-test.svg";
import nutritionIcon from "@/assets/icons/nutrition.svg";
import ophthalmologyIcon from "@/assets/icons/ophthalmology.svg";
import papSmearIcon from "@/assets/icons/papsmear.svg";
import spirometerIcon from "@/assets/icons/SpirometerEnabled.svg";
import sportsMedicineIcon from "@/assets/icons/SportsMedicineEnabled.svg";
import urologyIcon from "@/assets/icons/urology.svg";

import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import { text } from "./text";

const MedicalFileDetailsHome = () => {
  return (
    <div className={styles.container}>
      <Link to={"psychology"}>
        <Card title={text.psychology} headerIcon={brainMappingIcon} />
      </Link>

      <Link to={"heart-examination"}>
        <Card
          title={text.hearthExamination}
          headerIcon={comprehensiveHeartExaminationsIcon}
        />
      </Link>

      <Link to={"ophthalmology"}>
        <Card title={text.ophthalmology} headerIcon={ophthalmologyIcon} />
      </Link>

      <Link to={"ENT"}>
        <Card title={text.ent} headerIcon={entIcon} />
      </Link>

      <Link to={"medicine-test"}>
        <Card title={text.medicineTest} headerIcon={medicineTestIcon} />
      </Link>

      <Link to={"imaging"}>
        <Card title={text.imaging} headerIcon={imagingIcon} />
      </Link>

      <Link to={"spirometer"}>
        <Card title={text.spirometer} headerIcon={spirometerIcon} />
      </Link>

      <Link to={"dentistry"}>
        <Card title={text.dentistry} headerIcon={dentistryIcon} />
      </Link>

      <Link to={"sports-medicine"}>
        <Card title={text.sportsMedicine} headerIcon={sportsMedicineIcon} />
      </Link>

      <Link to={"pap-smear"}>
        <Card title={text.papSmear} headerIcon={papSmearIcon} />
      </Link>

      <Link to={"food-and-diet"}>
        <Card title={text.foodAndDiet} headerIcon={nutritionIcon} />
      </Link>

      <Link to={"urology-specialist"}>
        <Card title={text.urologySpecialist} headerIcon={urologyIcon} />
      </Link>

      <Link to={"pulmonologist"}>
        <Card title={text.pulmonologist} headerIcon={lungIcon} />
      </Link>

      <Link to={"internist"}>
        <Card title={text.internist} headerIcon={internalIcon} />
      </Link>

      <Link to={"circulatory-specialist"}>
        <Card title={text.circulatorySpecialist} headerIcon={digestionIcon} />
      </Link>
    </div>
  );
};

export default MedicalFileDetailsHome;
