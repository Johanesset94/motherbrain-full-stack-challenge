import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Timeline.module.css";

interface TimelineItem {
  date: string;
  description: React.ReactNode;
  cta?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  lastItemRef?: any;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  lastItemRef = null,
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.timeline}>
      {items.map((item, index) => (
        <div
          key={item.date + item.description}
          className={styles["timeline-item"]}
          style={{ animationDelay: `calc(${index % 10} * 0.2s)` }}
          ref={index === items.length - 1 ? lastItemRef : null}
        >
          <div className={styles["timeline-date"]}>{item.date}</div>
          {item.cta && (
            <div onClick={() => navigate(`/organisation/${item.cta}`)}>
              <a>{item.cta}</a>
            </div>
          )}
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  );
};
