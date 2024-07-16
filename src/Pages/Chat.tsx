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

const Chat = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const chatId = searchParams.get("chatId");

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

    const [chats, setChats] = useState<any>([]);
    const [messages, setMessages] = useState<any>([]);

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
        const messages = await GetMessages(String(chatId));
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

  return (
    <div className='w-full h-screen p-2 flex gap-3'>
        <Card className='h-full'>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <BsPeople />
                    <p className="font-semibold">Clients chats:</p>
                </div>
            </CardHeader>
            <CardContent className="h-[85%] flex flex-col gap-3 overflow-auto">
                {
                    chats.map((chat: any) => (
                        <ClientChat chat={chat} />
                    ))
                }
            </CardContent>
        </Card>

        <Card className='h-full w-full px-4 overflow-hidden'>
            <div ref={chatRef} className="h-[90%] w-full p-3 flex flex-col gap-3 overflow-auto">
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
                        <Button onClick={sendMessage} className='w-[10%] bg-[#7538D4]' size="icon">
                            <RiSendPlane2Fill size={20} />
                        </Button>
                    ) : (
                        <Button disabled className='w-[10%] bg-[#7538D4]' size="icon">
                            <RiSendPlane2Fill size={20} />
                        </Button>
                    )
                }
            </div>
        </Card>
    </div>
  )
}

export default Chat