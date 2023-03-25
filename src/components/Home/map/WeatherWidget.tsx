import { weather } from "@/pages";
import moment from "moment";
import SkeletonCard from "@/components/SkeletonCard";
import { useState, useEffect } from "react";
import { BsThermometerHigh, BsThermometerLow } from "react-icons/bs";
import { WiSunrise, WiSunset } from "react-icons/wi";

type props = {
  weather: weather | null;
  loading: boolean;
  city: string;
};

const WeatherWidget = ({ weather, loading, city }: props) => {
  return (
    <>
      {loading ? (
        <SkeletonCard />
      ) : (
        <div className="font-Outfit mt-4 text-base">
          <div className="flex justify-between">
            <h2 className="text-4xl font-semibold">
              {weather?.main.temp}&deg;C{" "}
            </h2>
            <div className="ml-8">
              <p>
                {weather?.main.temp_max} &deg;C <BsThermometerHigh />
              </p>
              <p className="">
                {weather?.main.temp_min} &deg;C <BsThermometerLow />
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <p className="text-2xl">{city}</p>
            <p className="">{moment.unix(weather?.dt!).format(" hh:mm:ss")}</p>
          </div>

          <div className="flex mt-4 justify-between ">
            <p>
              {moment.unix(weather?.sys.sunrise!).format("hh:mm:ss")}{" "}
              <WiSunrise />
            </p>
            <p>
              {moment.unix(weather?.sys.sunset!).format("hh:mm:ss")}{" "}
              <WiSunset />
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <div>
              <p>Humidity</p>
              <p>{weather?.main.humidity}%</p>
            </div>
            <div>
              <p>Wind</p>
              <p>{weather?.wind.speed} mph</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherWidget;
