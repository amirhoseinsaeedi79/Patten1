import React from "react";

import { Outlet } from "react-router-dom";

import styles from "./styles.module.css";

const ResultAnnouncement: React.FC = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default ResultAnnouncement;
