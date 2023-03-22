import { BsSearch } from "react-icons/bs";

const Header = () => {
  return (
    <header className="md:py-6 px-2 md:px-8 py-4  border-b-[1px] border-b-solid border-b-[#000]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Cities.</h1>
        <ul className="flex items-center">
          <li className="mx-4">
            <BsSearch size="1.4em" />
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
