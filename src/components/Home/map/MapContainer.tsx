import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import Pin from "./Pin";
import { useMemo, useState } from "react";
import { citiesData } from "@/store/data/cities";

interface city {
  city: string;
  country: string;
  continent: string;
  latitude: string;
  longitude: string;
}

const MapContainer = () => {
  const [popupInfo, setPopupInfo] = useState<city | null>({
    city: "",
    country: "",
    continent: "",
    latitude: "",
    longitude: "",
  });

  const pins = useMemo(
    () =>
      citiesData.map((city, index) => (
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
          }}
        >
          <Pin />
        </Marker>
      )),
    [],
  );

  return (
    <Map
      initialViewState={{
        latitude: 3.349149,
        longitude: 6.605874,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
      }}
      style={{ width: 1620, height: 874 }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxAccessToken={
        "pk.eyJ1IjoidGhlbmV4dGdlbjEiLCJhIjoiY2xmanduZXpzMDU0ZjQ0bXRmM2Jka3o5MCJ9.-4ffm1XlKpDC7owVYtAFTQ"
      }
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
          <p>{popupInfo.continent}</p>
          <p>{popupInfo.country}</p>
        </Popup>
      )}
    </Map>
  );
};

export default MapContainer;
