import Card from "@/components/ui/Card"
import { Link } from "react-router-dom"

import ophthalmologyIcon from "@/assets/icons/ophthalmology.svg"

import styles from "./styles.module.css"
import { text } from "./text"

const PsychologyHome = () => {
  const psychologyFields = [
    {
      route: "MMPI",
      title: text.mmpi,
      icon: ophthalmologyIcon,
    },
    {
      route: "wechsler",
      title: text.wechsler,
      icon: ophthalmologyIcon,
    },
    {
      route: "simple-strop",
      title: text.simpStrop,
      icon: ophthalmologyIcon,
    },
    {
      route: "wisconsin-cards",
      title: text.wiscCards,
      icon: ophthalmologyIcon,
    },
    {
      route: "go-no-go",
      title: text.goBack,
      icon: ophthalmologyIcon,
    },
    {
      route: "london-tower",
      title: text.londonTower,
      icon: ophthalmologyIcon,
    },
    {
      route: "bart",
      title: text.bart,
      icon: ophthalmologyIcon,
    },
    {
      route: "twisted-strop",
      title: text.londonTower,
      icon: ophthalmologyIcon,
    },
    {
      route: "NBack",
      title: text.nBack,
      icon: ophthalmologyIcon,
    },
    {
      route: "EQ",
      title: text.eq,
      icon: ophthalmologyIcon,
    },
    {
      route: "SCL90",
      title: text.scl90,
      icon: ophthalmologyIcon,
    },
    {
      route: "neo",
      title: text.neo,
      icon: ophthalmologyIcon,
    },
    {
      route: "brain-mapping",
      title: text.brainMapping,
      icon: ophthalmologyIcon,
    },
  ]
  return (
    <div className={styles.container}>
      {psychologyFields.map((field, index) => (
        <Link to={field.route}>
          <Card title={field.title} headerIcon={field.icon} />
        </Link>
      ))}
    </div>
  )
}

export default PsychologyHome
