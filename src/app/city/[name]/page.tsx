import { getCurrentWeather, getHourlyWeather } from "@/lib/fetchWeather";
import TemperatureChart from "@/components/TemperatureChart/TemperatureChart";

export const dynamic = "force-dynamic";

export default async function CityPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const weather = await getCurrentWeather(name);
  const forecast = await getHourlyWeather(weather.coord.lat, weather.coord.lon);
  const today = new Date().getDate();

  const hourlyData = forecast.list
    .filter((item: any) => new Date(item.dt_txt).getDate() === today)
    .map((item: any) => ({
      time: new Date(item.dt_txt).getHours() + ":00",
      temp: Math.round(item.main.temp),
    }));

  return (
    <div style={{ padding: 20 }}>
      <h2>{Math.round(weather.main.temp)}°C</h2>
      <div>{weather.weather[0].description}</div>
      <div>Humidity: {weather.main.humidity}%</div>
      <div>Wind: {weather.wind.speed} m/s</div>

      <TemperatureChart data={hourlyData} />
    </div>
  );
}
