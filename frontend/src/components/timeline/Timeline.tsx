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
        <div
          key={item.date}
          className={styles["timeline-item"]}
          style={{ animationDelay: `calc(${index} * 0.2s)` }}
        >
          <div className={styles["timeline-date"]}>{item.date}</div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  );
};
