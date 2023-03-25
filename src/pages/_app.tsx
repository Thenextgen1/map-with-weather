import AppContext from "@/context/AppContext";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { useState } from "react";

type store = {
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

export default function App({ Component, pageProps }: AppProps) {
  const [store, setStore] = useState<store>({
    sideBar: false,
    popUp: false,

    citiesData: {
      city: "",
      country: "",
      continent: "",
      latitude: undefined,
      longitude: undefined,
    },
  });

  return (
    <AppContext.Provider value={{ store, setStore }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
