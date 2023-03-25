import styles from "@/styles/Home.module.css";
import { SlArrowDown } from "react-icons/sl";
import { IoFilterSharp } from "react-icons/io5";

interface props {
  setFilteredList: Dispatch<
    SetStateAction<
      {
        city: string;
        country: string;
        continent: string;
        latitude: string;
        longitude: string;
      }[]
    >
  >;
  citiesData: {
    city: string;
    country: string;
    continent: string;
    latitude: string;
    longitude: string;
  }[];
}

const Search = ({ setFilteredList, citiesData }: props) => {
  const store = useStore();
  const filterBySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...citiesData];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.city.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    // Trigger render with updated values
    setFilteredList(updatedList);
    store.setStore((prevValue: any) => {
      return {
        ...prevValue,
        sideBar: true,
      };
    });
  };

  return (
    <section>
      <form
        className={`${styles.search_form}  md:pr-8 flex items-center justify-between py-4`}
      >
        <div className="sm:flex-[2_1_0] mr-2 sm:mr-0">
          <input
            type="text"
            placeholder="Search Cities"
            className="text-lg pl-8 xl:pl-20 md:pl-14 w-full"
            onChange={filterBySearch}
          />
        </div>
        <p className="text-[18px] mr-3 sm:flex-[1_1_0] text-right">
          <IoFilterSharp className="mx-4 hidden sm:inline" />
          Sort{" "}
          <SlArrowDown
            className="mx-4 hidden sm:inline"
            size="1.2em"
          />{" "}
        </p>
      </form>
    </section>
  );
};

export default Search;
import React, { Dispatch, SetStateAction } from "react";
import { useStore } from "@/hooks/useStore";
