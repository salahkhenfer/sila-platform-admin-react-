import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { RemoveNotification } from "../utils/removeChatNotification";

const clientChat = ({ chat } : { chat: any }) => {

  const location = useLocation();
  const navigate = useNavigate();
  const replace = (path: string) => {
    navigate(path, { replace: true });
  };

  const searchParams = new URLSearchParams(location.search);
  const pathName = location.pathname;

  //Getting chat id from params
  const chatId = searchParams.get("chatId");

  //Parsing time
  const [time, setTime] = useState("");

  useEffect(() => {
    const dateTimePart = chat.last_message_time.split(' ')[0] + 'T' + chat.last_message_time.split(' ')[1] + 'Z';
    const date = new Date(dateTimePart);

    const formatted = date.toISOString();
    setTime(formatted);
  }, []);
  //


  //Opening chat by setting the chat id in the params
  const openChat = async () => {
    const params = new URLSearchParams(searchParams);
    params.set("chatId", chat.id);
    params.set("chatName", chat.chat_name);
    params.set("lastMessageTime", time);
    replace(`${pathName}?${params.toString()}`);

    if (chat.last_message_sender != "admin") {
      await RemoveNotification(chat.id);
    }
  };

  return (
    <button onClick={openChat} className="flex items-center gap-3 p-3 rounded-2xl w-full mb-3 relative" style={{backgroundColor: chatId == chat.id ? '#7438d442' : 'transparent',}}>
        <Avatar>
            <AvatarImage src="/user.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
                <p className="truncate font-semibold max-w-[3rem]">{chat.chat_name}</p>
                <p className="text-[14px] font-medium text-[gray]">{moment(time).format('LT')}</p>
            </div>

            <p className="text-start truncate font-light max-w-[7rem]">{chat.last_message}</p>
        </div>

        {
          chat.notify && chat.last_message_sender != "admin" && (
            <div className="h-[30px] w-[30px] rounded-full bg-[red] absolute right-3 bottom-3 flex items-center justify-center">
              <FaBell color="#fff" />
            </div>
          )
        }
    </button>
  )
}

export default clientChat