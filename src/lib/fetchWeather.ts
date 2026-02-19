

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(city: string) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=866f0648e88684b6cca4662ff31e718f`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
}

export async function getHourlyWeather(lat: number, lon: number) {
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=866f0648e88684b6cca4662ff31e718f`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch forecast");
  }

  return res.json();
}
