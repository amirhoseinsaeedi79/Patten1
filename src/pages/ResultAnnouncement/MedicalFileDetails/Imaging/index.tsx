import React from "react";

import { Outlet } from "react-router-dom";

import styles from "./styles.module.css";

const Imaging: React.FC = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default Imaging;
