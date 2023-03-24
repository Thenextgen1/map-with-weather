import AppContext from "@/context/AppContext";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [store, setStore] = useState({
    sideBar: false,

    citiesData: {
      city: "",
      country: "",
      continent: "",
      latitude: "3.349149",
      longitude: "6.605874",
    },
  });

  return (
    <AppContext.Provider value={{ store, setStore }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
