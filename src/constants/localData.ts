export const navbarRoutes = [
  {
    route: "/",
    title: "بارگزاری پرونده پزشکی",
  },
  {
    route: "/resultAnnouncement",
    title: "اعلام نتایج",
  },
  {
    route: "/resultAnnouncement/medicalFileDetails",
    title: "جزییات پرونده سلامت",
  },
  {
    route: "/resultAnnouncement/medicalFileDetails/psychology",
    title: "روانشناسی",
  },
  {
    route: "/resultAnnouncement/medicalFileDetails/imaging",
    title: "تصویربرداری",
  },
  {
    route: "/resultAnnouncement/medicalFileDetails/imaging/sonography",
    title: "سونوگرافی",
  },
]

export const treatmentPlanNameOptions = [
  {
    label:
      "توصیه به مطالعه محتوای آموزشی در خصوص اصلاح وضعیت تحرک بدنی :: توصیه به مطالعه محتوای آموزشی در خصوص اصلاح وضعیت تحرک بدنی/",
    value: "1",
  },
  {
    label: "توصیه به بهبود وضعیت تغذیه :: توصیه به بهبود وضعیت تغذیه/",
    value: "2",
  },
  {
    label:
      "ارجاع به متخصص روانپزشکی- روانشناسی :: ارجاع به متخصص روانپزشکی- روانشناسی /",
    value: "3",
  },
  { label: "سایر", value: "4" },
]

export const uploadDocTypeOptions = [
  { label: "نتیجه ویزیت پزشک", value: 12459 },
  { label: "گزارش آزمایشگاه", value: 1575371403223 },
  { label: "گزارش سونوگرافی", value: 1575371428114 },
  { label: "گزارش تصویربرداری پزشکی", value: 1575371445839 },
  { label: "گزارش اسپیرومتری", value: 1575371460130 },
  { label: "نوار قلب", value: 1575371690907 },
  { label: "تصویر ضایعه پوستی", value: 1575371726875 },
  { label: "تصویر رادیولوژی", value: 1575371753654 },
  { label: "گزارش رادیولوژی", value: 1575371825795 },
  { label: "گزارش اکو کاردیوگرافی", value: 1575372002492 },
  { label: "گزارش آندوسکوپی/کلونوسکپی", value: 1575372029797 },
  { label: "سایر تصاویر پزشکی", value: 13427 },
  { label: "گزارش خودم", value: 1575371387033 },
]

export const valideUploadFileType = new Set([
  "image/pdf",
  "image/png",
  "image/jpg",
  "image/jpeg",
])
