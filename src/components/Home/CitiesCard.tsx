import { useStore } from "@/hooks/useStore";
import { useState } from "react";
import { GiPositionMarker } from "react-icons/gi";

type props = {
  details: {
    city: string;
    country: string;
    continent: string;
    longitude: string;
    latitude: string;
  };
};
const CitiesCard = ({ details }: props) => {
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

  const handleActive = () => {
    setActive(!active);
    switchMarker();
  };

  function backgroundRGB() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let RGBColor = "rgb(" + x + "," + y + "," + z + "," + "0.2" + ")";
    return RGBColor;
  }

  return (
    <div
      onClick={handleActive}
      style={{ backgroundColor: active ? backgroundRGB() : "white" }}
      className="rounded-lg py-6 flex items-baseline cursor-pointer my-3 px-3 border-[1px] border-solid border-[#cac1c1]"
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
