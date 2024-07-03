import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

// Define types for file and steps
type File = {
  name: string;
  size: number;
  type: string;
  // Add more properties as per your file data structure
};

interface Step {
  stepTitle: string;
  stepNumber: number;
  stepType: string;
  stepContent: string;
  itemsNumber: number;
  items: Array<string>; // Adjust the type based on what 'items' represents
  note: string;
  // Add more fields if necessary
}

// Create a context to share state between components
interface SponsorContextType {
  file: File | null;
  setFile: (file: File | null) => void;
  steps: Step[];
  setSteps: (steps: Step[]) => void;
}

export const SponsorContext = createContext<SponsorContextType>({
  file: null,
  setFile: () => {},
  steps: [],
  setSteps: () => {},
});

const Sponsor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);

  return (
    <SponsorContext.Provider value={{ file, setFile, steps, setSteps }}>
      <Outlet />
    </SponsorContext.Provider>
  );
};

export default Sponsor;
