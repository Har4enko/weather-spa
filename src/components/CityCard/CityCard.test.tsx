// src/components/CityCard/CityCard.test.tsx
import { render, screen } from "@testing-library/react";
import CityCard from "./CityCard";
import { mockFetch } from "../../mocks/fetchMock";

describe("CityCard", () => {
  beforeEach(() => {
    mockFetch({}); // мокуємо fetch
  });

  test("renders city name and temperature", () => {
    render(
      <CityCard city="Kyiv" temp={25} description="clear sky" icon="01d" />,
    );

    expect(screen.getByText("Kyiv")).toBeInTheDocument();
    expect(screen.getByText("25°C")).toBeInTheDocument();
    expect(screen.getByText("clear sky")).toBeInTheDocument();
  });
});
