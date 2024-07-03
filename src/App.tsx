import { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { CircularProgress } from "@mui/material";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Toaster } from "sonner";
import { SiMonkeytie } from "react-icons/si";
import { HiPhone } from "react-icons/hi";
import { motion } from "framer-motion";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import ClientOnly from "./utils/ClientOnly";
import DashboardPage from "./components/dashboard/DashboardPage";
import Profile from "./components/profile/Profile";
import Posts from "./Pages/Posts";
import Stories from "./Pages/Stories";
import Sponsor from "./Pages/Sponsor";
import SponsorPage from "./components/sponsor/SponsorPage";
import { useAuth } from "./lib/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/stories",
        element: <Stories />,
      },
      {
        path: "/sponsor",
        element: <Sponsor />,
        children: [
          {
            index: true,
            element: <SponsorPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <App />,
  },
]);

function App() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, auth } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    login(password);
    setLoading(false);
  };
  useEffect(() => {
    console.log(auth);

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [isAuthenticated]);
  if (auth.isAuthenticated || isAuthenticated) {
    // return <Navigate to="/" />; // Optionally return a loading spinner or a message
  } else {
    return (
      <ClientOnly>
        <main className="h-screen flex">
          <Toaster position="top-right" />
          <div className="hidden lg:block h-screen w-1/2 bg-black">
            <img
              src={"/logo.png"}
              alt="Sila-logo"
              width={100}
              height={100}
              className="m-7"
            />
          </div>
          <div className="h-screen w-screen lg:w-1/2 flex items-center justify-center">
            <motion.div
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              transition={{ type: "spring", duration: 1 }}
              className="min-w-[10rem]"
            >
              <Card className="w-[25rem]">
                <CardHeader>
                  <h2 className="font-semibold">
                    Hello, this is the Sila Agency Admin Dashboard
                  </h2>
                  <p className="font-light text-[.8rem]">
                    Enter the password below to continue
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <SiMonkeytie />
                    <p>Admin Password:</p>
                  </div>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="admin password..."
                  />
                </CardContent>
                <CardFooter className="flex flex-col gap-7">
                  <Button
                    onClick={handleSubmit}
                    className="w-full flex items-center gap-4 bg-black"
                  >
                    {loading ? (
                      <CircularProgress size={13} color="inherit" />
                    ) : (
                      <>
                        <p>Access Dashboard</p>
                        <TbLayoutDashboardFilled />
                      </>
                    )}
                  </Button>

                  <Separator />

                  <Dialog>
                    <DialogTrigger className="border-[1px] p-2 rounded-md hover:bg-slate-50 text-[13px] font-medium">
                      Forgot Password?
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="flex flex-col gap-3">
                        <DialogTitle>
                          Passwords are secured by the Admin team!
                        </DialogTitle>
                        <DialogDescription className="flex flex-col gap-2">
                          <div className="flex items-center gap-3">
                            <HiPhone />
                            <p>
                              Feel free to contact the admin team to restore the
                              password:
                            </p>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </main>
      </ClientOnly>
    );
  }
}

export default App;
