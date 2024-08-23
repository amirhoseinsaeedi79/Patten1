import { lazy } from "react"

// import {
// BART,
// BELLY_SONOGRAPHY,
// BRAIN_MAPPING,
// BREAST_SONOGRAPHY,
// "circulatory-specialist",
// DENSITOMETER,
// DENTISTRY,
// DOPPLER_SONOGRAPHY_LOWER_LIMB_VESSELS,
// DOPPLER_SONOGRAPHY_NECK_VESSELS,
// ENT,
// EQ,
// ERROR_ROUTE,
// FOOD_AND_DIET,
// GO_NO_GO,
// HEALTH_FOLLOW_UP_PROGRAMS,
// HEARTH_EXAMINATIONS,
// HOME_ROUTE,
// IMAGING,
// INTERNIST,
// LONDON_TOWER,
// MAMMOGRAPHY,
// MEDICAL_FILE_DETAILS,
// MEDICAL_FILE_SUMMARY,
// MEDICINE_TEST,
// MMPI,
// NBACK,
// NEO,
// OPHTHALMOLOGY,
// PAP_SMEAR,
// PELVIS_SONOGRAPHY,
// PSYCHOLOGY,
// PULMONOLOGIST,
// "radiology",
// RECOMMENDATIONS,
// RESULT_ANNOUNCEMENT,
// SCL90,
// SIMPLE_STROP,
// SONOGRAPHY,
// SPIROMETER,
// SPORTS_MEDICINE,
// TESTICLE_SONOGRAPHY,
// THYROID_SONOGRAPHY,
// TWISTED_STROP,
// UPLOAD_MEDICAL_FILES,
//   UROLOGY_SPECIALIST,
//   VAGINAL_SONOGRAPHY,
//   WECHSLER,
//   WISCONSIN_CARDS,
// } from "constants/routes.ts";
// import CirculatorySpecialist from "pages/CaringFile/ResultAnnouncement/MedicalFileDetails/CirculatorySpecialist";
// import FoodAndDiet from "pages/CaringFile/ResultAnnouncement/MedicalFileDetails/FoodAndDiet";
// import Internist from "pages/CaringFile/ResultAnnouncement/MedicalFileDetails/Internist";
// import PapSmear from "pages/CaringFile/ResultAnnouncement/MedicalFileDetails/PapSmear";
// import Pulmonologist from "pages/CaringFile/ResultAnnouncement/MedicalFileDetails/Pulmonologist";
// import UrologySpecialist from "pages/CaringFile/ResultAnnouncement/MedicalFileDetails/UrologySpecialist";
import { useRoutes } from "react-router-dom"
import RootLayout from "@/layouts/RootLayout"
import NotFound from "@/pages/NotFound"
import { static_routes } from "@/constants/routes"

// // protected
const Home = lazy(() => import("@/pages/Home"))


export const Routes = () =>
  useRoutes(
   static_routes)

export default Routes
