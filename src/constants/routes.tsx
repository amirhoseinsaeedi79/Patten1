import { lazy } from "react"
import NotFound from "@/pages/NotFound"
import RootLayout from "@/layouts/RootLayout"
import ResultAnnouncementHome from "@/pages/ResultAnnouncement/Home"

const Home = lazy(() => import("@/pages/Home"))
const ResultAnnouncement = lazy(() => import("@/pages/ResultAnnouncement"))
const UploadMedicalFiles = lazy(() => import("@/pages/UploadMedicalFiles"))
const MedicalFileSummary = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileSummary")
)
const HealthFollowUpPrograms = lazy(
  () => import("@/pages/ResultAnnouncement/HealthFollowUpPrograms")
)
const Recommendations = lazy(
  () => import("@/pages/ResultAnnouncement/Recommendations")
)
const MedicalFileDetails = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails")
)
const MedicalFileDetailsHome = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Home")
)
const Psychology = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Psychology")
)
const PapSmear = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/PapSmear")
)
const FoodAndDiet = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/FoodAndDiet")
)
const UrologySpecialist = lazy(
  () =>
    import("@/pages/ResultAnnouncement/MedicalFileDetails/UrologySpecialist")
)
const Pulmonologist = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Pulmonologist")
)
const CirculatorySpecialist = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/CirculatorySpecialist"
    )
)
const Internist = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Internist")
)

const PsychologyHome = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/Home")
)
const Mmpi = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/MMPI")
)
const Wechsler = lazy(
  () =>
    import("@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/Wechsler")
)
const SimpleStrop = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/SimpleStrop"
    )
)
const WisconsinCards = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/WisconsinCards"
    )
)
const GoNoGo = lazy(
  () =>
    import("@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/GoNoGo")
)
const LondonTower = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/LondonTower"
    )
)
const Bart = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/Bart")
)
const TwistedStrop = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/TwistedStrop"
    )
)
const Nback = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/NBACK")
)
const Eq = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/EQ")
)
const Scl90 = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/SCL90")
)
const Neo = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/NEO")
)
const BrainMapping = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Psychology/BrainMapping"
    )
)
const ComprehensiveHearthExamination = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/ComprehensiveHearthExamination"
    )
)
const Dentistry = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Dentistry")
)
const Ent = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Ent")
)

const Imaging = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Imaging")
)
const ImagingHome = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Home")
)
const Mammography = lazy(
  () =>
    import("@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Mammography")
)
const Densitometer = lazy(
  () =>
    import("@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Densitometer")
)
const Radiology = lazy(
  () =>
    import("@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Radiology")
)
const Sonography = lazy(
  () =>
    import("@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Sonography")
)
const SonographyHome = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Sonography/Home"
    )
)
const BellySonography = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Sonography/BellySonography"
    )
)
const PelvisSonography = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Sonography/PelvisSonography"
    )
)
const BreastSonography = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Sonography/BreastSonography"
    )
)
const VaginalSonography = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Sonography/VaginalSonography"
    )
)
const ThyroidSonography = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Sonography/ThyroidSonography"
    )
)
const DopplerSonographyNeckVessels = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Sonography/DopplerSonographyNeckVessels"
    )
)
const DopplerSonographyLowerLimbVessels = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Sonography/DopplerSonographyLowerLimbVessels"
    )
)
const TesticleSonography = lazy(
  () =>
    import(
      "@/pages/ResultAnnouncement/MedicalFileDetails/Imaging/Sonography/TesticleSonography"
    )
)
const MedicineTest = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/MedicineTest")
)
const Ophthalmology = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Ophthalmology")
)
const Spirometer = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/Spirometer")
)
const SportsMedicine = lazy(
  () => import("@/pages/ResultAnnouncement/MedicalFileDetails/SportsMedicine")
)

// const ErrorPage = lazy(() => import("components/error/ErrorPage"));

export const static_routes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "/result-announcement",
        element: <ResultAnnouncement />,
        children: [
          {
            element: <ResultAnnouncementHome />,
            index: true,
          },
          {
            path: "medical-file-summary",
            element: <MedicalFileSummary />,
          },
          {
            path: "health-followUp-programs",
            element: <HealthFollowUpPrograms />,
          },
          {
            path: "recommandations",
            element: <Recommendations />,
          },
          {
            path: "medical-file-details",
            element: <MedicalFileDetails />,
            children: [
              {
                element: <MedicalFileDetailsHome />,
                index: true,
              },
              {
                path: "psychology",
                element: <Psychology />,
                children: [
                  {
                    element: <PsychologyHome />,
                    index: true,
                  },
                  {
                    path: "MMPI",
                    element: <Mmpi />,
                  },
                  {
                    path: "wechsler",
                    element: <Wechsler />,
                  },
                  {
                    path: "simple-strop",
                    element: <SimpleStrop />,
                  },
                  {
                    path: "wisconsin-cards",
                    element: <WisconsinCards />,
                  },
                  {
                    path: "go-no-go",
                    element: <GoNoGo />,
                  },
                  {
                    path: "london-tower",
                    element: <LondonTower />,
                  },
                  {
                    path: "bart",
                    element: <Bart />,
                  },
                  {
                    path: "twisted-strop",
                    element: <TwistedStrop />,
                  },
                  {
                    path: "NBack",
                    element: <Nback />,
                  },
                  {
                    path: "EQ",
                    element: <Eq />,
                  },
                  {
                    path: "SCL90",
                    element: <Scl90 />,
                  },
                  {
                    path: "Neo",
                    element: <Neo />,
                  },
                  {
                    path: "brain-mapping",
                    element: <BrainMapping />,
                  },
                ],
              },
              {
                path: "heart-examination",
                element: <ComprehensiveHearthExamination />,
              },
              {
                path: "ophthalmology",
                element: <Ophthalmology />,
              },
              {
                path: "ENT",
                element: <Ent />,
              },
              {
                path: "medicine-test",
                element: <MedicineTest />,
              },
              {
                path: "dentistry",
                element: <Dentistry />,
              },
              {
                path: "spirometer",
                element: <Spirometer />,
              },
              {
                path: "sports-medicine",
                element: <SportsMedicine />,
              },
              {
                path: "pap-smear",
                element: <PapSmear />,
              },
              {
                path: "food-and-diet",
                element: <FoodAndDiet />,
              },
              {
                path: "urology-specialist",
                element: <UrologySpecialist />,
              },
              {
                path: "pulmonologist",
                element: <Pulmonologist />,
              },
              {
                path: "circulatory-specialist",
                element: <CirculatorySpecialist />,
              },
              {
                path: "internist",
                element: <Internist />,
              },
              {
                path: "IMAGING",
                element: <Imaging />,
                children: [
                  {
                    element: <ImagingHome />,
                    index: true,
                  },
                  {
                    path: "radiology",
                    element: <Radiology />,
                  },
                  {
                    path: "sonography",
                    element: <Sonography />,
                    children: [
                      {
                        element: <SonographyHome />,
                        index: true,
                      },
                      {
                        path: "belly-sonography",
                        element: <BellySonography />,
                      },
                      {
                        path: "pelvis-sonography",
                        element: <PelvisSonography />,
                      },
                      {
                        path: "breast-sonography",
                        element: <BreastSonography />,
                      },
                      {
                        path: "vaginal-sonography",
                        element: <VaginalSonography />,
                      },
                      {
                        path: "thyroid-sonography",
                        element: <ThyroidSonography />,
                      },
                      {
                        path: "doppler-sonography-neck-vessels",
                        element: <DopplerSonographyNeckVessels />,
                      },
                      {
                        path: "doppler-sonography-lower-limb-vessels",
                        element: <DopplerSonographyLowerLimbVessels />,
                      },
                      {
                        path: "testicle-sonography",
                        element: <TesticleSonography />,
                      },
                    ],
                  },
                  {
                    path: "densitometer",
                    element: <Densitometer />,
                  },
                  {
                    path: "mammography",
                    element: <Mammography />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "/upload-medical-files",
        element: <UploadMedicalFiles />,
        index: true,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]
