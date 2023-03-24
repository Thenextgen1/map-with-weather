import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import Pin from "./Pin";
import { useState } from "react";
import { citiesData } from "@/store/data/cities";
import { useStore } from "@/hooks/useStore";
import moment from "moment-timezone";

interface city {
  city: string;
  country: string;
  continent: string;
  latitude: string;
  longitude: string;
}

type weather = {
  main: {
    temp_max: string;
    temp_min: string;
  };
};

const MapContainer = () => {
  const Token = process.env.NEXT_PUBLIC_MAP_TOKEN;
  const store = useStore();
  const [weather, setWeather] = useState<weather>({
    main: {
      temp_max: "",
      temp_min: "",
    },
  });

  const [popupInfo, setPopupInfo] = useState<city | null>(null);

  //   https://api.openweathermap.org/data/2.5/weather?lat=${latLng.lat}&lon=${latLng.lon}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_API

  async function getWeatherData() {
    try {
      const serverResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${popupInfo?.latitude}&lon=${popupInfo?.longitude}&units=imperial&appid=6e1d06e92201bae8f6d78925a0f12996`,
      );
      const data = await serverResponse.json();
      console.log(data);
      if (data?.cod === "400") throw data;
      setWeather(data);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(weather);

  const pins = citiesData.map((city, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={parseInt(city.longitude)}
      latitude={parseInt(city.latitude)}
      anchor="bottom"
      onClick={(e) => {
        // If we let the click event propagates to the map, it will immediately close the popup
        // with `closeOnClick: true`
        e.originalEvent.stopPropagation();
        setPopupInfo(city);
        if (popupInfo?.latitude !== undefined) {
          getWeatherData();
        }
      }}
    >
      <Pin />
    </Marker>
  ));

  return (
    <Map
      initialViewState={{
        latitude: parseInt(store.store.citiesData.latitude),
        longitude: parseInt(store.store.citiesData.longitude),
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
      }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxAccessToken={Token}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {pins}

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <p>{popupInfo.city}</p>
          <p>{popupInfo.country}</p>
          <div>
            <h2>
              <span className="mx-2">{weather?.main?.temp_max}&deg;C</span>
              <span>{weather?.main?.temp_min}&deg;C</span>
            </h2>

            <div className="today__sun-times"></div>
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default MapContainer;
