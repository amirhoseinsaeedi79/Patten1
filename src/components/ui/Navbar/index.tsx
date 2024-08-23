import { useState } from "react"

import closeIcon from "@/assets/icons/close.svg"
import classNames from "classnames"
// import { RiMenu2Fill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom"

import styles from "./styles.module.css"
import { navbarRoutes } from "@/constants/localData"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeRoute, setActiveRoute] = useState("/")
  // const location = useLocation()
  // const route = location.pathname

  return (
    <>
      <div className="flex justify-end lg:justify-start items-center gap-4 md:bg-white p-4 w-full font-bold">
        <div className={styles.contentMenu}>
          {navbarRoutes.map((item, index) => (
            <Link
              to={item.route}
              key={index}
              onClick={() => setActiveRoute(item.route)}
            >
              <div
                className={`${styles.home} ${
                  activeRoute === item.route ? styles.active : styles.menuItem
                }`}
              >
                {item.title}
              </div>
            </Link>
          ))}
        </div>
        <div onClick={() => setIsOpen(true)} className="lg:hidden">
          {/* <RiMenu2Fill className="w-[30px] h-[30px]" />  reza */}
        </div>
      </div>
      {/* hamburger menu in mobile */}
      <div
        className={classNames(
          styles.contentHamburgerMenu,
          isOpen ? "flex" : "hidden"
        )}
      >
        <div>
          <img
            src={closeIcon}
            alt="HomePage"
            className="bg-white p-1 rounded-full"
            onClick={() => setIsOpen(false)}
          />
        </div>
        {navbarRoutes.map((item, index) => (
          <Link
            to={item.route}
            key={index}
            onClick={() => setActiveRoute(item.route)}
          >
            <div
              className={`${styles.home} ${
                activeRoute === item.route ? styles.active : styles.menuItem
              }`}
            >
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Navbar
