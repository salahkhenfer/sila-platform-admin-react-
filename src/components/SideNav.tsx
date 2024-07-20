import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiStats } from "react-icons/bi";
import {
  MdHistoryToggleOff,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { TbLayoutDashboardFilled, TbLogout2 } from "react-icons/tb";
import { Button } from "../components/ui/button";

import { RiStickyNoteAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/Auth";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { GetChats } from "../utils/getChats";

const WS_URL = "wss://sila-backend-v2.onrender.com/v2/chatWebsocket";

const SideNav = () => {
  const [shrink, setShrink] = useState<boolean>(false);
  const [notification, setNotification] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const { logout } = useAuth();
  const handelLogout = () => {
    logout();
  };

  const checkNotifications = async () => {
    const data = await GetChats();
    data.chats.map((chat: any) => {
      if (chat.notify && chat.last_message_sender != "admin") {
        setNotification(true);
      }
    })
  };

  useEffect(() => {
    checkNotifications();
  }, []);

  //Receiving websocket messages
  useEffect(() => {
    const newSocket = new WebSocket(WS_URL);
    setSocket(newSocket);

    newSocket.addEventListener("open", () => {
      console.log("WebSocket connection opened");
    });

    newSocket.addEventListener("message", (event) => {
      checkNotifications();
    });
  }, []);
  //

  return (
    <div>
      <motion.div
        animate={{ width: shrink ? "4rem" : "25rem" }}
        transition={{ type: "spring", duration: 0.5 }}
        className="md:w-[25rem] max-md:hidden p-4 w-full h-full overflow-x-hidden max-md:h-screen   min-w-[4rem] bg-white z-50 md:p-4  pl-0 relative border-r-[1px] border-gray-300"
      >
        <div className="flex items-center justify-between">
          {!shrink && (
            <Link
              className="hidden lg:block text-purple-600 font-semibold text-[1.3rem] ml-4"
              to="/"
            >
              <h1>Sila Agency</h1>
            </Link>
          )}
          <Button
            className="hidden flex items-center justify-center ml-1 h-[40px] w-[40px] min-h-[40px] min-w-[40px]"
            variant="outline"
            onClick={() => setShrink(!shrink)}
            size="icon"
          >
            {shrink ? (
              <MdKeyboardArrowRight size={20} />
            ) : (
              <MdKeyboardArrowLeft size={20} />
            )}
          </Button>
        </div>

        <div className="mt-10">
          <Link
            to={"/"}
            className="flex items-center gap-4 w-full min-w-[20rem] justify-start text-black hover:bg-purple-600 hover:text-white rounded-none p-4"
          >
            <TbLayoutDashboardFilled size={20} />
            <p>Dashboard</p>
          </Link>
          <Link
            to={"/posts"}
            className="flex items-center gap-4 w-full min-w-[20rem] justify-start text-black hover:bg-purple-600 hover:text-white rounded-none p-4"
          >
            <RiStickyNoteAddFill size={20} />
            <p>Posts</p>
          </Link>
          <Link
            to={"/stories"}
            className="flex items-center gap-4 w-full min-w-[20rem] justify-start text-black hover:bg-purple-600 hover:text-white rounded-none p-4"
          >
            <MdHistoryToggleOff size={20} />
            <p>Stories</p>
          </Link>
          <Link
            to={"/chat"}
            className="flex items-center gap-4 w-full min-w-[20rem] justify-start text-black hover:bg-purple-600 hover:text-white rounded-none p-4 relative"
          >
            <BsFillChatLeftDotsFill size={20} />
            <p>Chat</p>
            {
              notification && (
                <div className="h-[10px] w-[10px] rounded-full bg-[red] absolute top-3 left-3"></div>
              )
            }
          </Link>
          <Link
            to={"/sponsor"}
            className="flex items-center gap-4 w-full min-w-[20rem] justify-start text-black hover:bg-purple-600 hover:text-white rounded-none p-4"
          >
            <BiStats size={20} />
            <p>Add Sponsors</p>
          </Link>
          <Link
            to={"/login"}
            onClick={handelLogout}
            className="flex items-center gap-4 w-full min-w-[20rem] justify-start text-black hover:bg-red-600 hover:text-white rounded-none p-4"
          >
            <TbLogout2 size={20} />
            <p>Log out</p>
          </Link>
        </div>
      </motion.div>
      <Button
        className=" flex md:hidden z-50  fixed top-0  left-0 items-center justify-center ml-1 h-[40px] w-[40px] min-h-[40px] min-w-[40px]"
        onClick={() => setShrink(!shrink)}
        variant="outline"
        size="icon"
      >
        {shrink ? (
          <MdKeyboardArrowRight size={20} />
        ) : (
          <MdKeyboardArrowLeft size={20} />
        )}
      </Button>
      <motion.div
        animate={{ width: shrink ? "0" : "25rem" }}
        transition={{ type: "spring", duration: 0.5 }}
        className="md:w-[25rem] md:hidden fixed  w-full overflow-x-hidden max-md:h-screen    bg-white z-30 md:p-4 pl-0  border-r-[1px] border-gray-300"
      >
        <div className="flex items-center justify-between">
          {!shrink && (
            <Link
              className="hidden lg:block text-purple-600 font-semibold text-[1.3rem] ml-4"
              to="/"
               onClick={() => setShrink(!shrink)}
            >
              <h1>Sila Agency</h1>
            </Link>
          )}
        </div>

        <div className="mt-10">
          <Link
            to={"/"}
             onClick={() => setShrink(!shrink)}
            className="flex items-center gap-4 w-full min-w-[20rem] justify-start text-black hover:bg-purple-600 hover:text-white rounded-none p-4"
          >
            <TbLayoutDashboardFilled size={20} />
            <p>Dashboard</p>
          </Link>
          <Link
            to={"/posts"}
             onClick={() => setShrink(!shrink)}
            className="flex items-center gap-4 w-full min-w-[20rem] justify-start text-black hover:bg-purple-600 hover:text-white rounded-none p-4"
          >
            <RiStickyNoteAddFill size={20} />
            <p>Posts</p>
          </Link>
          <Link
            to={"/stories"}
             onClick={() => setShrink(!shrink)}
            className="flex items-center gap-4 w-full min-w-[20rem] justify-start text-black hover:bg-purple-600 hover:text-white rounded-none p-4"
          >
            <MdHistoryToggleOff size={20} />
            <p>Stories</p>
          </Link>
          <Link
            to={"/chat"}
             onClick={() => setShrink(!shrink)}
            className="flex items-center gap-4 w-full min-w-[20rem] justify-start text-black hover:bg-purple-600 hover:text-white rounded-none p-4 relative"
          >
            <BsFillChatLeftDotsFill size={20} />
            <p>Chat</p>
            {
              notification && (
                <div className="h-[10px] w-[10px] rounded-full bg-[red] absolute top-3 left-3"></div>
              )
            }
          </Link>
          <Link
            to={"/sponsor"}
             onClick={() => setShrink(!shrink)}
            className="flex items-center gap-4 w-full min-w-[20rem] justify-start text-black hover:bg-purple-600 hover:text-white rounded-none p-4"
          >
            <BiStats size={20} />
            <p>Add Sponsors</p>
          </Link>
          <div
            className="flex items-center gap-4 w-full min-w-[20rem] justify-start text-black hover:bg-red-600 hover:text-white rounded-none p-4"
            onClick={handelLogout}
          >
            <TbLogout2 size={20} />
            <p>Log out</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SideNav;
