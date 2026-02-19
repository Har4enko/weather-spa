"use client";

import { useEffect, useState } from "react";
import CityCard from "@/components/CityCard/CityCard";
import AddCityForm from "@/components/AddCityForm/AddCityForm";
import { getCurrentWeather, getHourlyWeather } from "@/lib/fetchWeather";
import styles from "./CityList.module.scss";

interface CityData {
  city: string;
  temp: number;
  description: string;
  icon: string;
  hourly?: { time: string; temp: number }[];
}

const STORAGE_KEY = "weatherCities";

export default function CityList() {
  const [hydrated, setHydrated] = useState(false);
  const [cities, setCities] = useState<CityData[]>([]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const loadCities = async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      const citiesFromStorage = stored
        ? JSON.parse(stored)
        : ["Kyiv", "London", "Berlin", "Tokyo", "New York"];

      setCities(
        citiesFromStorage.map((c: string) => ({
          city: c,
          temp: 0,
          description: "",
          icon: "",
          hourly: [],
        })),
      );

      for (let i = 0; i < citiesFromStorage.length; i++) {
        const cityName = citiesFromStorage[i];
        try {
          const weather = await getCurrentWeather(cityName);
          const forecast = await getHourlyWeather(
            weather.coord.lat,
            weather.coord.lon,
          );
          const today = new Date().getDate();
          const hourly = forecast.list
            .filter((i: any) => new Date(i.dt_txt).getDate() === today)
            .map((i: any) => ({
              time: new Date(i.dt_txt).getHours() + ":00",
              temp: Math.round(i.main.temp),
            }));
          const cityData: CityData = {
            city: weather.name,
            temp: weather.main.temp,
            description: weather.weather[0].description,
            icon: weather.weather[0].icon,
            hourly,
          };

          setCities((prev) => {
            const copy = [...prev];
            copy[i] = cityData;
            return copy;
          });
        } catch (err) {
          console.error("Failed to fetch weather for", cityName);
        }
      }
    };

    loadCities();
  }, [hydrated]);

  if (!hydrated) return null;

  const saveToLocalStorage = (data: CityData[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.map((c) => c.city)));
  };

  const handleAdd = async (city: string) => {
    try {
      const weather = await getCurrentWeather(city);
      const forecast = await getHourlyWeather(
        weather.coord.lat,
        weather.coord.lon,
      );
      const today = new Date().getDate();
      const hourly = forecast.list
        .filter((i: any) => new Date(i.dt_txt).getDate() === today)
        .map((i: any) => ({
          time: new Date(i.dt_txt).getHours() + ":00",
          temp: Math.round(i.main.temp),
        }));
      const cityData: CityData = {
        city: weather.name,
        temp: weather.main.temp,
        description: weather.weather[0].description,
        icon: weather.weather[0].icon,
        hourly,
      };
      setCities((prev) => {
        const updated = [...prev, cityData];
        saveToLocalStorage(updated);
        return updated;
      });
    } catch (err) {
      alert("City not found or failed to fetch weather");
    }
  };

  const handleRefresh = async (city: string) => {
    const weather = await getCurrentWeather(city);
    const forecast = await getHourlyWeather(
      weather.coord.lat,
      weather.coord.lon,
    );
    const today = new Date().getDate();
    const hourly = forecast.list
      .filter((i: any) => new Date(i.dt_txt).getDate() === today)
      .map((i: any) => ({
        time: new Date(i.dt_txt).getHours() + ":00",
        temp: Math.round(i.main.temp),
      }));
    const cityData: CityData = {
      city: weather.name,
      temp: weather.main.temp,
      description: weather.weather[0].description,
      icon: weather.weather[0].icon,
      hourly,
    };
    setCities((prev) => prev.map((c) => (c.city === city ? cityData : c)));
  };

  const handleDelete = (city: string) => {
    setCities((prev) => {
      const filtered = prev.filter((c) => c.city !== city);
      saveToLocalStorage(filtered);
      return filtered;
    });
  };

  return (
    <div>
      <AddCityForm onAdd={handleAdd} />
      <div className={styles.list}>
        {cities.map((c) => (
          <CityCard
            key={c.city}
            city={c.city}
            temp={c.temp}
            description={c.description}
            icon={c.icon}
            hourly={c.hourly}
            onRefresh={handleRefresh}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
