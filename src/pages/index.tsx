import styles from "@/styles/Home.module.css";
import { citiesData } from "@/store/data/cities";
import BaseLayout from "@/layout";
import { Search } from "@/components";
import CitiesCard from "@/components/Home/CitiesCard";
import { useState } from "react";
import MapContainer from "@/components/Home/map/MapContainer";
import { useStore } from "@/hooks/useStore";

export interface city {
  city: string;
  country: string;
  continent: string;
  longitude: string | undefined;
  latitude: string | undefined;
}

export type weather = {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  wind: { speed: number; deg: number };
};

export default function Home() {
  const store = useStore();
  const active = store.store.sideBar;
  const [filteredList, setFilteredList] = useState(citiesData);
  const [popupInfo, setPopupInfo] = useState<city | null>(null);
  const [bgIndex, setBgIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<weather | null>(null);

  //   https://api.openweathermap.org/data/2.5/weather?lat=${latLng.lat}&lon=${latLng.lon}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_API

  async function getWeatherData() {
    try {
      const serverResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${popupInfo?.latitude}&lon=${popupInfo?.longitude}&units=imperial&appid=6e1d06e92201bae8f6d78925a0f12996`,
      );
      const data = await serverResponse.json();

      if (data?.cod === "400") throw data;
      setWeather(data);
    } catch (err) {}
  }

  return (
    <BaseLayout
      title={"Map-with-weather"}
      description={""}
      keywords={""}
    >
      <main className={styles.main}>
        <Search
          setFilteredList={setFilteredList}
          citiesData={citiesData}
        />
        <section className="flex  lg:px-4">
          <section className=" lg:block hidden ">
            {filteredList.map((details, i) => (
              <CitiesCard
                key={i}
                details={details}
                index={i}
                setPopupInfo={setPopupInfo}
                bgIndex={bgIndex}
                setLoading={setLoading}
                setBgIndex={setBgIndex}
                getWeatherData={getWeatherData}
                loading={loading}
              />
            ))}
          </section>

          {active && (
            <section className=" absolute top-[17%] lg:hidden z-20 px-2 w-full bg-white">
              {filteredList.map((details, i) => (
                <CitiesCard
                  key={i}
                  details={details}
                  setPopupInfo={setPopupInfo}
                  loading={loading}
                  index={i}
                  bgIndex={bgIndex}
                  setBgIndex={setBgIndex}
                  setLoading={setLoading}
                  getWeatherData={getWeatherData}
                />
              ))}
            </section>
          )}

          <section className="lg:ml-4 mt-3 h-screen w-screen">
            <MapContainer
              popupInfo={popupInfo}
              weather={weather}
              setPopupInfo={setPopupInfo}
              getWeatherData={getWeatherData}
              loading={loading}
              setLoading={setLoading}
            />
          </section>
        </section>
      </main>
    </BaseLayout>
  );
}
