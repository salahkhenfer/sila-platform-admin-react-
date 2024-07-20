import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";  
import { BsPeople } from "react-icons/bs";
import { Button } from "../components/ui/button";
import ClientChat from "../components/clientChat";
import { RiAttachmentLine } from "react-icons/ri";
import { PiMicrophoneLight } from "react-icons/pi";
import { RiSendPlane2Fill } from "react-icons/ri";
import Message from "../components/message";
import ReceivedMessage from "../components/receivedMessage";
import AudioMessage from "../components/audioMessage";
import ReceivedAudioMessage from "../components/receivedAudioMessage";
import PhotoMessage from "../components/photoMessage";
import ReceivedPhotoMessage from "../components/receivedPhotoMessage";
import VideoMessage from "../components/videoMessage";
import ReceivedVideoMessage from "../components/receivedVideoMessage";
import FileMessage from "../components/fileMessage";
import ReceivedFileMessage from "../components/receivedFileMessage";
import { useEffect, useRef, useState } from "react";
import AudioRecorder from "../components/audioRecorder";
import FileInspector from "../components/fileInspector";
import { GetChats } from "../utils/getChats";
import { useLocation } from "react-router-dom";
import { GetMessages } from "../utils/getMessages";
import { SendMessage } from "../utils/sendMessage";
import { UploadFile } from "../utils/upload";
import {
    SheetClose,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet";  
import { ScrollArea } from "../components/ui/scroll-area";
import { GoPeople } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { IoTime } from "react-icons/io5";
import moment from "moment";
import { FaCircleArrowUp } from "react-icons/fa6";
import CircularProgress from '@mui/material/CircularProgress';
import { Input } from "../components/ui/input";
import { CiSearch } from "react-icons/ci";
import { SearchChats } from "../utils/searchChats";

const WS_URL = "wss://sila-backend-v2.onrender.com/v2/chatWebsocket";

const Chat = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const chatId = searchParams.get("chatId");
    const chatName = searchParams.get("chatName");
    const lastMessageTime = searchParams.get("lastMessageTime");

    const imageRegex = /\bimage\b/;
    const videoRegex = /\bvideo\b/;
    
    const chatRef = useRef<HTMLDivElement>(null);

    const [startRecording, setStartRecording] = useState(false);
    const [audioFile, setAudioFile] = useState<any>(null);
    const [audioURL, setAudioURL] = useState<any>(null);
    const [inputType, setInputType] = useState("text");
    const [photo, setPhoto] = useState<any>(null);
    const [video, setVideo] = useState<any>(null);
    const [file, setFile] = useState<any>(null);
    const [textMessage, setTextMessage] = useState("");
    const [showSendBtn, setShowSendBtn] = useState(false);
    const [search, setSearch] = useState("");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const [chats, setChats] = useState<any>([]);
    const [messages, setMessages] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);

    //Receiving websocket messages
    useEffect(() => {
        const newSocket = new WebSocket(WS_URL);
        setSocket(newSocket);
    
        newSocket.addEventListener("open", () => {
          console.log("WebSocket connection opened");
        });
    
        newSocket.addEventListener("message", (event) => {
          const message = JSON.parse(event.data);
          if (String(message.chat_id) == String(chatId)) {
            setMessages((prev: any) => [...prev, message]);
            scrollToBottom();
            (async () => {
                const data = await GetChats();
                setChats(data.chats);
            })();
          }
        });
    }, [chatId]);
    //

    useEffect(() => {
        if (startRecording) {
            setInputType("audio");
            setTextMessage("");
        } else if (photo != null || video != null || file != null) {
            setInputType("file");
            setTextMessage("");
        } else {
            setInputType("text");
        };
    }, [startRecording, photo, video, file]);

    useEffect(() => {
        if (audioFile != null && audioURL != null) {
            setShowSendBtn(true);
        } else if (photo != null || video != null || file != null) {
            setShowSendBtn(true);
        } else if (textMessage != "") {
            setShowSendBtn(true);
        } else {
            setShowSendBtn(false);
        };
    }, [audioFile, audioURL, photo, video, file, textMessage]);

    const selectFile = (e: any) => {
        if (imageRegex.test(e.target.files[0].type)) {
            setPhoto(e.target.files[0]);
        } else if (videoRegex.test(e.target.files[0].type)) {
            setVideo(e.target.files[0]);
        } else {
            setFile(e.target.files[0]);
        };
    };

    //Getting all chats
    useEffect(() => {
        (async () => {
            const data = await GetChats();
            setChats(data.chats);
        })();
    }, []);

    //Getting messages for this chat
    const getChatMessages = async () => {
        setPage(1);
        const messages = await GetMessages(String(chatId), 50, 1);
        if (chatId != "") {
            setMessages(messages.messages);
            scrollToBottom();
        };
    };

    useEffect(() => {
        getChatMessages();
    }, [chatId]);

    //Sending the message
    const sendMessage = async () => {
        if (textMessage != "") {
            setMessages((prev: any) => [...prev, {
                chat_id: chatId,
                sender_id: "admin",
                message_type: "text",
                content: textMessage,
                sending: true,
                created_at: Date.now()
            }]);
            scrollToBottom();

            await SendMessage(String(chatId), "admin", "text", textMessage);
            getChatMessages();
            const msg = {
                chat_id: chatId,
                sender_id: "admin",
                message_type: "text",
                content: textMessage,
                sending: true,
                created_at: Date.now()
            };
            if (socket) {
                socket.send(JSON.stringify(msg));
            }

            clearInput();
        } else if (photo != null) {
            setMessages((prev: any) => [...prev, {
                chat_id: chatId,
                sender_id: "admin",
                message_type: "photo",
                content: URL.createObjectURL(photo),
                sending: true,
                created_at: Date.now()
            }]);
            scrollToBottom();

            const photoURL = await UploadFile(photo);
            await SendMessage(String(chatId), "admin", "photo", photoURL);
            getChatMessages();
            const msg = {
                chat_id: chatId,
                sender_id: "admin",
                message_type: "photo",
                content: photoURL,
                sending: true,
                created_at: Date.now()
            };
            if (socket) {
                socket.send(JSON.stringify(msg));
            }

            clearInput();
        } else if (video != null) {
            setMessages((prev: any) => [...prev, {
                chat_id: chatId,
                sender_id: "admin",
                message_type: "video",
                content: URL.createObjectURL(video),
                sending: true,
                created_at: Date.now()
            }]);
            scrollToBottom();

            const videoURL = await UploadFile(video);
            await SendMessage(String(chatId), "admin", "video", videoURL);
            getChatMessages();
            const msg = {
                chat_id: chatId,
                sender_id: "admin",
                message_type: "video",
                content: videoURL,
                sending: true,
                created_at: Date.now()
            };
            if (socket) {
                socket.send(JSON.stringify(msg));
            }

            clearInput();
        } else if (file != null) {
            setMessages((prev: any) => [...prev, {
                chat_id: chatId,
                sender_id: "admin",
                message_type: "file",
                content: URL.createObjectURL(file),
                sending: true,
                created_at: Date.now()
            }]);
            scrollToBottom();

            const fileURL = await UploadFile(file);
            await SendMessage(String(chatId), "admin", "file", fileURL);
            getChatMessages();
            const msg = {
                chat_id: chatId,
                sender_id: "admin",
                message_type: "file",
                content: fileURL,
                sending: true,
                created_at: Date.now()
            };
            if (socket) {
                socket.send(JSON.stringify(msg));
            }

            clearInput();
        } else if (audioFile != null && audioURL != null) {
            setMessages((prev: any) => [...prev, {
                chat_id: chatId,
                sender_id: "admin",
                message_type: "audio",
                content: audioURL,
                sending: true,
                created_at: Date.now()
            }]);
            scrollToBottom();

            const audioUrl = await UploadFile(audioFile);
            await SendMessage(String(chatId), "admin", "audio", audioUrl);
            getChatMessages();
            const msg = {
                chat_id: chatId,
                sender_id: "admin",
                message_type: "audio",
                content: audioUrl,
                sending: true,
                created_at: Date.now()
            };
            if (socket) {
                socket.send(JSON.stringify(msg));
            }

            clearInput();
        }
    };

    const clearInput = () => {
        setTextMessage("");
        setPhoto(null);
        setVideo(null);
        setFile(null);
        setStartRecording(false);
        setAudioFile(null);
        setAudioURL(null);
    };

    const scrollToBottom = () => {
        if (chatRef.current) {
            setTimeout(() => {
                chatRef.current?.scrollTo({
                    top: chatRef.current.scrollHeight,
                    behavior: 'smooth',
                });
            }, 100);
        }
    };

    const paginateMessages = async () => {
        setPageLoading(true);
        setPage(page + 1);
        const messages = await GetMessages(String(chatId), 50, page + 1);
        setMessages((prev: any) => [...messages.messages, ...prev]);
        setPageLoading(false);
    };

    const searchChats = async () => {
        const data = await SearchChats(search);
        setChats(data.chats);
    };

  return (
    <div className='w-full h-screen p-2 flex flex-col items-start gap-3'>
        <Sheet>
            <SheetTrigger>
                <Button className="flex items-center gap-3">
                    <GoPeople size={20} />
                    <p>See clients</p>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-3">
                        <GoPeople size={40} />
                        <p>Chats for Sila Agency Support:</p>
                    </SheetTitle>
                    <SheetDescription>
                        You can find all the chats of all the clients that contacted the Support
                        down below, and reply to them at any time!
                    </SheetDescription>
                    <SheetDescription>
                        <div className="w-full relative">
                            {
                                search != "" ? (
                                    <Button onClick={searchChats} size="icon" className="absolute left-1 h-[30px] w-[30px] rounded-full top-[50%] translate-y-[-50%]">
                                        <CiSearch size={20} />
                                    </Button>
                                ) : (
                                    <CiSearch size={20} className="absolute left-3 top-[50%] translate-y-[-50%]" />
                                )
                            }
                            <Input value={search} onChange={(e) => setSearch(e.target.value)} className="px-10" placeholder="Search Chats..." />
                        </div>
                    </SheetDescription>
                </SheetHeader>
                <div className="w-full h-[80%] mt-3">
                    {
                        chats.length == 0 ? (
                            <div className="flex items-center gap-3">
                                <img className="h-[150px] w-[150px]" src="/empty.gif" alt="empty icon" />
                                <p className="text-[14px] font-medium">No clients so far...</p>
                            </div>
                        ) : (
                            <ScrollArea className="h-full w-full p-4">  
                                {
                                    chats.map((chat: any) => (
                                        <SheetClose className="w-full">
                                            <ClientChat chat={chat} />
                                        </SheetClose>
                                    ))
                                }
                            </ScrollArea>
                        )
                    }
                </div>
            </SheetContent>
        </Sheet>

        {
            chatName && lastMessageTime && (
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="/user.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div>
                        <p className="text-[14px] font-semibold">{chatName}</p>
                        <div className="flex items-center gap-2">
                            <p className="text-[14px] text-[gray] font-light">{moment(lastMessageTime).format('LT')}</p>
                            <IoTime />
                        </div>
                    </div>
                </div>
            )
        }

        <Card className='h-full w-full px-4 overflow-hidden'>
            {
                messages.length == 0 ? (
                    <div className="w-full h-[90%] flex flex-col items-center justify-center gap-3">
                        <div className="h-[70px] w-[70px] rounded-full bg-[#7538D4]">
                            <img className="h-full w-full object-contain" src="/logo.png" alt="sila logo" />
                        </div>
                        <p className="font-light text-[1.3rem] text-center max-w-[15rem]">Sila Marketing Agency Support Chat</p>
                        <img className="h-[300px] w-[300px]" src="/chat.gif" alt="support chat" />
                    </div>
                ) : (
                    <div ref={chatRef} className="h-[90%] w-full p-3 flex flex-col gap-3 overflow-auto">
                        <button onClick={paginateMessages} className='w-fit h-[2rem] self-center bg-[#7438d488] flex items-center gap-3 p-2 rounded-2xl text-white'>
                            <p className='text-[14px]'>Load more messages</p>
                            {
                                pageLoading ? (
                                    <CircularProgress size={13} color='inherit' />
                                ) : (
                                    <FaCircleArrowUp />
                                )
                            }
                        </button>
                        {
                            messages.map((msg: any) => (
                                <>
                                    {
                                        msg.message_type == "text" && (
                                            <>
                                                {
                                                    msg.sender_id == "admin" ? (
                                                        <Message msg={msg} />
                                                    ) : (
                                                        <ReceivedMessage msg={msg} />
                                                    )
                                                }
                                            </>
                                        )
                                    }

                                    {
                                        msg.message_type == "audio" && (
                                            <>
                                                {
                                                    msg.sender_id == "admin" ? (
                                                        <AudioMessage msg={msg} />
                                                    ) : (
                                                        <ReceivedAudioMessage msg={msg} />
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                    
                                    {
                                        msg.message_type == "photo" && (
                                            <>
                                                {
                                                    msg.sender_id == "admin" ? (
                                                        <PhotoMessage msg={msg} />
                                                    ) : (
                                                        <ReceivedPhotoMessage msg={msg} />
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                    
                                    {
                                        msg.message_type == "video" && (
                                            <>
                                                {
                                                    msg.sender_id == "admin" ? (
                                                        <VideoMessage msg={msg} />
                                                    ) : (
                                                        <ReceivedVideoMessage msg={msg} />
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                    
                                    {
                                        msg.message_type == "file" && (
                                            <>
                                                {
                                                    msg.sender_id == "admin" ? (
                                                        <FileMessage msg={msg} />
                                                    ) : (
                                                        <ReceivedFileMessage msg={msg} />
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </>
                            ))
                        }
                    </div>
                )
            }




            {
                chatId && (
                    <div className="h-[10%] w-full flex items-center gap-5">
                        {
                            inputType == "text" && (
                                <>
                                    <label htmlFor="file" className='cursor-pointer'>
                                        <input onChange={selectFile} className='hidden' id='file' type="file" />
                                        <RiAttachmentLine size={20} />
                                    </label>
                                    <input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} className='h-full w-full focus:outline-none indent-4' type="text" placeholder='Enter your message here...' />
                                    <Button onClick={() => setStartRecording(true)} variant="ghost" size="icon">
                                        <PiMicrophoneLight size={20} />
                                    </Button>
                                </>
                            )
                        }

                        {
                            inputType == "audio" && (
                                <AudioRecorder setStartRecording={setStartRecording} audioFile={audioFile} setAudioFile={setAudioFile} audioURL={audioURL} setAudioURL={setAudioURL} />
                            )
                        }

                        {
                            inputType == "file" && (
                                <FileInspector photo={photo} setPhoto={setPhoto} video={video} setVideo={setVideo} file={file} setFile={setFile} />
                            )
                        }

                        
                        {
                            showSendBtn ? (
                                <Button onClick={sendMessage} className='w-[10%] min-w-[40px] bg-[#7538D4]' size="icon">
                                    <RiSendPlane2Fill size={20} />
                                </Button>
                            ) : (
                                <Button disabled className='w-[10%] min-w-[40px] bg-[#7538D4]' size="icon">
                                    <RiSendPlane2Fill size={20} />
                                </Button>
                            )
                        }
                    </div>
                )
            }
        </Card>
    </div>
  )
}

export default Chat