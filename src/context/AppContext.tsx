import { Dispatch, SetStateAction, createContext } from "react";

interface contextData {
  store: {
    sideBar: boolean;

    citiesData: {
      city: string;
      country: string;
      continent: string;
      longitude: string;
      latitude: string;
    };
  };
  setStore: Dispatch<
    SetStateAction<{
      sideBar: boolean;

      citiesData: {
        city: string;
        country: string;
        continent: string;
        longitude: string;
        latitude: string;
      };
    }>
  >;
}

const AppContext = createContext<contextData | undefined>(undefined);

export default AppContext;
