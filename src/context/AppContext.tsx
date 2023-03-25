import { Dispatch, SetStateAction, createContext } from "react";

interface contextData {
  store: {
    sideBar: boolean;
    popUp: boolean;
    citiesData: {
      city: string;
      country: string;
      continent: string;
      longitude: string | undefined;
      latitude: string | undefined;
    };
  };
  setStore: Dispatch<
    SetStateAction<{
      sideBar: boolean;
      popUp: boolean;
      citiesData: {
        city: string;
        country: string;
        continent: string;
        longitude: string | undefined;
        latitude: string | undefined;
      };
    }>
  >;
}

const AppContext = createContext<contextData | undefined>(undefined);

export default AppContext;
