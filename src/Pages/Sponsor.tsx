import React from "react";
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const SponsorContext = createContext();

const Sponsor = () => {
  const [file, setFile] = useState(null);
  const [steps, setSteps] = useState([]);

  return (
    <SponsorContext.Provider value={{ file, setFile, steps, setSteps }}>
      <Outlet />
    </SponsorContext.Provider>
  );
};

export default Sponsor;
