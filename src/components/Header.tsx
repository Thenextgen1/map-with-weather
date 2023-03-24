import { SlMenu } from "react-icons/sl";

import { IoClose } from "react-icons/io5";
import { useStore } from "@/hooks/useStore";

const Header = () => {
  const store = useStore();

  function changesideBar() {
    store.setStore((prevValue: any) => {
      return {
        ...prevValue,
        sideBar: !store.store.sideBar,
      };
    });
  }

  return (
    <header className="md:py-6 px-2 md:px-8 py-4  border-b-[1px] border-b-solid border-b-[#000]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Cities.</h1>
        <ul className="flex items-center">
          <li className="mx-4 lg:hidden cursor-pointer">
            {!store.store.sideBar && (
              <SlMenu
                size="2em"
                onClick={changesideBar}
              />
            )}

            {store.store.sideBar && (
              <IoClose
                size="2em"
                onClick={changesideBar}
              />
            )}
          </li>
          <li className="mx-4 hidden md:block">
            <button className="font-Poppins text-lg text-white font-medium rounded-lg py-3 px-6 bg-[#151D48] ">
              Activate AlanAi
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
