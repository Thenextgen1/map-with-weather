import styles from "@/styles/Home.module.css";
import { citiesData } from "@/store/data/cities";
import BaseLayout from "@/layout";
import { Search } from "@/components";
import CitiesCard from "@/components/Home/CitiesCard";
import { useState } from "react";
import MapContainer from "@/components/Home/map/MapContainer";
import { useStore } from "@/hooks/useStore";

export default function Home() {
  const [filteredList, setFilteredList] = useState(citiesData);

  const store = useStore();
  const active = store.store.sideBar;

  return (
    <BaseLayout
      title={"Map-with-weather"}
      description={""}
      keywords={""}
    >
      <main className={styles.main}>
        <Search
          setFilteredList={setFilteredList}
          citiesData={citiesData}
        />
        <section className="flex  lg:px-4">
          {!active && (
            <section className=" lg:block hidden ">
              {filteredList.map((details, i) => (
                <CitiesCard
                  key={i}
                  details={details}
                />
              ))}
            </section>
          )}

          {active && (
            <section className=" absolute top-[17%] z-20 px-2 w-full bg-white">
              {filteredList.map((details, i) => (
                <CitiesCard
                  key={i}
                  details={details}
                />
              ))}
            </section>
          )}

          <section className="lg:ml-4 mt-3 h-screen w-screen">
            <MapContainer />
          </section>
        </section>
      </main>
    </BaseLayout>
  );
}
