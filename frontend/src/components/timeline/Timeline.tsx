import React from "react";
import styles from "./Timeline.module.css";

interface TimelineItem {
  date: string;
  description: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className={styles.timeline}>
      {items.map((item, index) => (
        <div key={index} className={styles["timeline-item"]}>
          <div className={styles["timeline-date"]}>{item.date}</div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  );
};
