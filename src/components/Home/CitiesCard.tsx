import { useState } from "react";
import { GiPositionMarker } from "react-icons/gi";

type props = {
  details: {
    city: string;
    country: string;
    continent: string;
  };
};
const CitiesCard = ({ details }: props) => {
  function randomRGB() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let RGBColor = "rgb(" + x + "," + y + "," + z + ")";
    return RGBColor;
  }
  function backgroundRGB() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let RGBColor = "rgb(" + x + "," + y + "," + z + "," + "0.2" + ")";
    return RGBColor;
  }

  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };

  return (
    <div
      onClick={handleActive}
      style={{ backgroundColor: active ? backgroundRGB() : "white" }}
      className="rounded-lg py-6 flex items-baseline cursor-pointer my-3 px-3 border-[1px] border-solid border-[#cac1c1]"
    >
      <div
        className="w-[10px] h-[10px] mr-3 rounded-full"
        style={{ backgroundColor: randomRGB() }}
      ></div>
      <div>
        <h2 className="text-xl font-semibold">{details.city}</h2>
        <p className="text-[#494949] font-medium">
          <GiPositionMarker className="mr-2" /> <span>{details.country}</span> .
          CNT: <span>{details.continent}</span>
        </p>
      </div>
    </div>
  );
};

export default CitiesCard;
