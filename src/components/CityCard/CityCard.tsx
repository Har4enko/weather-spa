"use client";

import Link from "next/link";
import styles from "./CityCard.module.scss";

interface Props {
  city: string;
  temp: number;
  description: string;
  icon: string;
  hourly?: { time: string; temp: number }[];
  onRefresh?: (city: string) => void;
  onDelete?: (city: string) => void;
}

export default function CityCard({
  city,
  temp,
  description,
  icon,
  onRefresh,
  onDelete,
}: Props) {
  return (
    <div className={styles.cardWrapper}>
      <Link href={`/city/${city}`} className={styles.link}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h3>{city}</h3>
            <img
              src={`http://openweathermap.org/img/wn/${icon}.png`}
              alt={description}
              width={50}
              height={50}
            />
          </div>
          <div className={styles.temp}>{Math.round(temp)}°C</div>
          <div className={styles.desc}>{description}</div>
        </div>
      </Link>

      <div className={styles.actions}>
        {onRefresh && (
          <button onClick={() => onRefresh(city)} className={styles.refresh}>
            Refresh Weather
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(city)} className={styles.delete}>
            Delete City
          </button>
        )}
      </div>
    </div>
  );
}
