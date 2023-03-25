import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import Pin from "./Pin";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useStore } from "@/hooks/useStore";
import { city, weather } from "@/pages";
import WeatherWidget from "./WeatherWidget";

interface props {
  setPopupInfo: Dispatch<SetStateAction<city | null>>;
  popupInfo: city | null;
  weather: weather | null;
  getWeatherData(): Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const MapContainer = ({
  setPopupInfo,
  popupInfo,
  weather,
  getWeatherData,
  loading,
  setLoading,
}: props) => {
  const Token = process.env.NEXT_PUBLIC_MAP_TOKEN;
  const store = useStore();

  const [viewState, setViewState] = useState({
    latitude: 3.349149,
    longitude: 6.605874,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    setViewState((prevView) => {
      return {
        ...prevView,
        latitude:
          store.store.citiesData.latitude !== undefined
            ? parseInt(store.store.citiesData.latitude!)
            : 3.349149,
        longitude:
          store.store.citiesData.longitude !== undefined
            ? parseInt(store.store.citiesData.longitude!)
            : 6.605874,
      };
    });
  }, [
    store.store.citiesData,
    store.store.citiesData.latitude,
    store.store.citiesData.longitude,
  ]);

  function togglePopup() {
    store.setStore((prevValue: any) => {
      return {
        ...prevValue,
        popUp: !store.store.popUp,
      };
    });
  }

  return (
    <Map
      {...viewState}
      initialViewState={viewState}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxAccessToken={Token}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {store.store.citiesData.latitude !== undefined && (
        <Marker
          latitude={parseInt(store.store.citiesData.latitude!)}
          longitude={parseInt(store.store.citiesData.longitude!)}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();

            if (popupInfo?.latitude !== undefined) {
              setPopupInfo(store.store.citiesData);
              togglePopup();
            }

            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }}
        >
          <Pin />
        </Marker>
      )}

      {store.store.popUp && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo?.longitude)}
          latitude={Number(popupInfo?.latitude)}
          onClose={() => togglePopup()}
          style={{ maxWidth: "none" }}
          onOpen={() => getWeatherData()}
          className="min-w-[240px] max-w-none px py-2"
        >
          <WeatherWidget
            weather={weather}
            loading={loading}
            city={popupInfo?.city!}
          />
        </Popup>
      )}
    </Map>
  );
};

export default MapContainer;
