import { useStore } from "@/hooks/useStore";
import { city } from "@/pages";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GiPositionMarker } from "react-icons/gi";

interface props {
  details: {
    city: string;
    country: string;
    continent: string;
    latitude: string;
    longitude: string;
  };
  setPopupInfo: Dispatch<SetStateAction<city | null>>;
  index: number;
  bgIndex: number | null;
  setBgIndex: Dispatch<SetStateAction<number | null>>;
  getWeatherData(): Promise<void>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

const CitiesCard = ({
  details,
  setPopupInfo,
  index,
  bgIndex,
  setBgIndex,
  getWeatherData,
  setLoading,
  loading,
}: props) => {
  const store = useStore();

  const [active, setActive] = useState(false);

  function switchMarker() {
    store.setStore((prevValue) => {
      return {
        ...prevValue,
        citiesData: {
          city: details.city,
          country: details.country,
          continent: details.continent,
          longitude: details.longitude,
          latitude: details.latitude,
        },
      };
    });
  }
  function togglePopup() {
    store.setStore((prevValue: any) => {
      return {
        ...prevValue,
        popUp: !store.store.popUp,
      };
    });
  }

  const handleActive = () => {
    togglePopup();
    setPopupInfo(details);
    switchMarker();
    setActive(!active);
    setTimeout(() => {
      setLoading(!loading);
      getWeatherData();
    }, 1000);

    setBgIndex(index);
  };

  return (
    <div
      onClick={handleActive}
      style={{ backgroundColor: bgIndex === index ? "#86868654" : "white" }}
      className="rounded-lg py-6 flex items-baseline cursor-pointer my-3 px-3 border-[1px] border-solid border-[#cac1c1] min-w-[290px]"
    >
      <div>
        <h2 className="text-xl font-semibold">{details.city}</h2>
        <p className="text-[#494949] font-medium">
          <GiPositionMarker className="" /> <span>{details.country}</span> .
          CNT: <span>{details.continent}</span>
        </p>
      </div>
    </div>
  );
};

export default CitiesCard;
