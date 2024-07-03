import { Outlet, useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import { createContext, useState, useEffect } from "react";
import { useAuth } from "../lib/Auth";

import { Dispatch, SetStateAction } from "react";

export const SubmissionContext = createContext<{
  selectedSubmission: string;
  setSelectedSubmission: Dispatch<SetStateAction<string>>;
}>({
  selectedSubmission: "",
  setSelectedSubmission: () => {},
});

function Dashboard() {
  const [selectedSubmission, setSelectedSubmission] = useState("");
  const { auth } = useAuth(); // Destructure auth from useAuth
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // useEffect(() => {
  //   console.log(isAuthenticated);

  //   if (isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated]);
  useEffect(() => {
    console.log(auth);

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [isAuthenticated]);
  // if (!auth.isAuthenticated || !isAuthenticated) {
  //   return <Navigate to="/login" />; // Optionally return a loading spinner or a message
  // }
  return (
    <div className="flex">
      <SubmissionContext.Provider
        value={{ selectedSubmission, setSelectedSubmission }}
      >
        <SideNav />
        <div className="max-md:pt-16 pl-3 w-full">
          <Outlet />
        </div>
      </SubmissionContext.Provider>
    </div>
  );
}

export default Dashboard;
