import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  }),
  tagTypes: ["Weather"],
  endpoints: (builder) => ({
    getWeather: builder.query<any, string>({
      query: (city) =>
        `weather?q=${city}&units=metric&appid=866f0648e88684b6cca4662ff31e718f`,
      providesTags: (result, error, city) => [{ type: "Weather", id: city }],
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
