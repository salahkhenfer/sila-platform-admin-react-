import React from "react";
import { BsFilePost } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { IoIosCloseCircle } from "react-icons/io";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { TbSend } from "react-icons/tb";
import { Button } from "../components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { IoVideocam } from "react-icons/io5";
import { AddPost } from "../utils/addPost";
import { AddPostPhoto } from "../utils/addPostPhoto";
import { AddPostVideo } from "../utils/addPostVideo";
import { UploadFile } from "../utils/upload";
import CircularProgress from "@mui/material/CircularProgress";

const postPopUp = () => {
  const [post, setPost] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [photos, setPhotos] = useState<any>(null);
  const [videos, setVideos] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendPost = async () => {
    setLoading(true);
    const postData = await AddPost(post);

    if (mediaType == "photo") {
      if (photos != null) {
        (async () => {
          try {
            const uploadPromises = Object.values(photos).map(
              async (photo: any) => {
                const url = await UploadFile(photo);
                AddPostPhoto(url, postData.post.id);
              }
            );

            await Promise.all(uploadPromises);
            alert("Post sent successfully ✅!");
            window.location.reload();
          } catch (err) {
            alert("Error uploading files!");
          }
        })();
      }
    } else {
      if (videos != null) {
        (async () => {
          try {
            const uploadPromises = Object.values(videos).map(
              async (video: any) => {
                const url = await UploadFile(video);
                AddPostVideo(url, postData.post.id);
              }
            );

            await Promise.all(uploadPromises);
            alert("Post sent successfully ✅!");
            window.location.reload();
          } catch (err) {
            alert("Error uploading files");
          }
        })();
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-purple-900 mb-2 mx-auto text-center font-bold rounded-xl  w-fit px-4 py-2 hover:bg-purple-500 text-white flex items-center justify-center">
        {/* <BsFilePost size={20} /> */}
        add post
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a post for users to see...</DialogTitle>
          <DialogDescription>
            Down below you can write a post as well as including as many videos
            or images you want your users to interact with!
          </DialogDescription>
        </DialogHeader>

        <Textarea
          onChange={(e) => setPost(e.target.value)}
          placeholder="Say hello to users 👋"
        />

        <Select onValueChange={setMediaType}>
          <SelectTrigger>
            <SelectValue placeholder="Media Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="photo">
              <div className="flex items-center gap-3">
                <TbPhotoSquareRounded />
                <p className="text-[13px] font-semibold">Photo</p>
              </div>
            </SelectItem>
            <SelectItem className="flex items-center gap-3" value="video">
              <div className="flex items-center gap-3">
                <IoVideocam />
                <p className="text-[13px] font-semibold">Video</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {mediaType == "photo" && (
          <label
            htmlFor="file"
            className="w-full h-[10rem] border-[3px] border-dotted border-black rounded-lg flex items-center justify-center cursor-pointer"
          >
            <input
              multiple
              onChange={(e) => setPhotos(e.target.files)}
              accept="image/*"
              className="hidden"
              type="file"
              id="file"
            />
            <div className="flex flex-col items-center gap-3">
              <TbPhotoSquareRounded size={30} />
              {photos != null && photos.length != 0 ? (
                <div className="flex items-center gap-2 flex-wrap max-w-[22rem] max-h-[6rem] overflow-auto">
                  {Object.values(photos).map((photo: any) => (
                    <div className="border-[1px] border-slate-300 rounded-md p-1 pl-5 pr-20 flex items-center gap-4 relative max-w-[10rem]">
                      <p className="truncate">{photo.name}</p>
                      <Button
                        onClick={() => setPhotos(null)}
                        size="icon"
                        className="absolute right-0 top-[50%] translate-y-[-50%] bg-transparent text-black hover:bg-transparent"
                      >
                        <IoIosCloseCircle size={20} />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Upload photos or videos for the post</p>
              )}
            </div>
          </label>
        )}

        {mediaType == "video" && (
          <label
            htmlFor="file"
            className="w-full h-[10rem] border-[3px] border-dotted border-black rounded-lg flex items-center justify-center cursor-pointer"
          >
            <input
              multiple
              onChange={(e) => setVideos(e.target.files)}
              accept="video/*"
              className="hidden"
              type="file"
              id="file"
            />
            <div className="flex flex-col items-center gap-3">
              <IoVideocam size={30} />
              {videos != null && videos.length != 0 ? (
                <div className="flex items-center gap-2 flex-wrap max-w-[22rem] max-h-[6rem] overflow-auto">
                  {Object.values(videos).map((video: any) => (
                    <div className="border-[1px] border-slate-300 rounded-md p-1 pl-5 pr-20 flex items-center gap-4 relative max-w-[10rem]">
                      <p className="truncate">{video.name}</p>
                      <Button
                        onClick={() => setVideos(null)}
                        size="icon"
                        className="absolute right-0 top-[50%] translate-y-[-50%] bg-transparent text-black hover:bg-transparent"
                      >
                        <IoIosCloseCircle size={20} />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Upload photos or videos for the post</p>
              )}
            </div>
          </label>
        )}

        {(photos != null && photos.length != 0) ||
        (videos != null && videos.length != 0) ? (
          <Button onClick={sendPost} className="flex items-center gap-3">
            {loading ? (
              <CircularProgress size={13} color="inherit" />
            ) : (
              <>
                <TbSend size={20} />
                POST
              </>
            )}
          </Button>
        ) : (
          <></>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default postPopUp;
