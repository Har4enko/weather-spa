import CityList from "@/components/CityList/CityList";
import "@/styles/globals.scss";

export default function HomePage() {
  return (
    <main>
      <h1>Weather Dashboard</h1>
      <CityList />
    </main>
  );
}
