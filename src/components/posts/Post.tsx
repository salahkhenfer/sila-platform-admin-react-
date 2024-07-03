import React, { useEffect, useState } from "react";

import { Card, CardContent } from "../ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { Button } from "../../components/ui/button";
import { RxDotsHorizontal } from "react-icons/rx";
import { IoHeart } from "react-icons/io5";
import { FaCommentDots } from "react-icons/fa6";
import { PiEyeClosedBold } from "react-icons/pi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { RiArrowDownSLine } from "react-icons/ri";
import { TbTrashFilled } from "react-icons/tb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { DeleteFile } from "../../utils/deleteFile";
import { DeletePost } from "../../utils/deletePost";
import CircularProgress from "@mui/material/CircularProgress";

const Post = ({ post }: { post: any }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deletePost = async () => {
    setLoading(true);

    if (post.photos != null) {
      const deletePromises = post.photos.map(async (photo: any) => {
        await DeleteFile(photo.photo);
      });

      await Promise.all(deletePromises);
      await DeletePost(post.id);
      window.location.reload();
    }

    if (post.videos != null) {
      const deletePromises = post.videos.map(async (video: any) => {
        await DeleteFile(video.video);
      });

      await Promise.all(deletePromises);
      await DeletePost(post.id);
      window.location.reload();
    }
  };

  return (
    <div className="border-b-[1px] border-slate-300">
      <div className="p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={"/sila-logo.jpg"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-[15px] font-medium">Sila Agency</p>
          <RiVerifiedBadgeFill />
          <GoDotFill size={10} color="gray" />
          <p className="text-[13px] font-semibold">
            {moment(post.created_at).startOf("day").fromNow()}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon">
              <RiArrowDownSLine />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Posts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger className="w-full">
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-3"
                >
                  <TbTrashFilled /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the post and remove it's data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button onClick={deletePost}>
                    {loading ? (
                      <CircularProgress size={13} color="inherit" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/*Post assets, meaning: "photos, videos...etc"*/}

      {post.photos != null && post.photos.length > 1 && (
        <Carousel>
          <CarouselContent className="h-[17rem]">
            {post.photos.map((photo: any) => (
              <CarouselItem className="relative">
                <img
                  src={photo.photo}
                  alt="post image"
                  fill
                  objectFit="cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-5" />
          <CarouselNext className="absolute right-5" />
        </Carousel>
      )}

      {post.photos != null && post.photos.length == 1 && (
        <div className="w-full h-[17rem] relative">
          <img
            src={post.photos[0].photo}
            alt="post image"
            fill
            objectFit="cover"
          />
        </div>
      )}

      {post.videos != null && post.videos.length > 1 && (
        <Carousel>
          <CarouselContent className="h-[17rem]">
            {post.videos.map((video: any) => (
              <CarouselItem>
                <video
                  className="w-full h-full object-cover"
                  src={video.video}
                  controls
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-5" />
          <CarouselNext className="absolute right-5" />
        </Carousel>
      )}

      {post.videos != null && post.videos.length == 1 && (
        <div className="w-full h-[17rem]">
          <video
            className="w-full h-full object-cover"
            src={post.videos[0].video}
            controls
          />
        </div>
      )}

      <p className="text-[14px] font-semibold">{post.post_text}</p>
    </div>
  );
};

export default Post;
