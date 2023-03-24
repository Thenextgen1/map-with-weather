import AppContext from "@/context/AppContext";
import { useContext } from "react";

function useStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a AppProvider");
  }
  return context;
}

export { useStore };
