import styles from "@/styles/Home.module.css";
import { citiesData } from "@/store/data/cities";
import BaseLayout from "@/layout";
import { Search } from "@/components";
import CitiesCard from "@/components/Home/CitiesCard";
import { useState } from "react";
import MapContainer from "@/components/Home/map/MapContainer";

export default function Home() {
  const [filteredList, setFilteredList] = useState(citiesData);

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
        <section className="flex ml-4">
          <section>
            {filteredList.map((details, i) => (
              <CitiesCard
                key={i}
                details={details}
              />
            ))}
          </section>
          <section className="ml-4 mt-3">
            <MapContainer />
          </section>
        </section>
      </main>
    </BaseLayout>
  );
}
