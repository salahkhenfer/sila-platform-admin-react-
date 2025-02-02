"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { BsFilePlus } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { TbCalendarShare, TbHistoryToggle } from "react-icons/tb";
import { AddStory } from "../utils/addStory";
import { UploadFile } from "../utils/upload";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

const StoryPopUp = () => {
  const [highlight, setHighlight] = useState("");
  const [Story, setStory] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const shareStory = async () => {
    setLoading(true);

    if (Story != null) {
      const url = await UploadFile(Story);
      await AddStory(highlight, url);

      //finished
      alert("Story created successfully! ✅");
      window.location.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-purple-900 my-5 text-center font-bold rounded-xl  w-fit px-4 py-2 hover:bg-purple-500 text-white flex items-center justify-center">
        {/* <BsFilePost size={20} /> */}
        Add Story
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            Create a Story! <TbHistoryToggle />
          </DialogTitle>
          <DialogDescription>
            You can add stories in form of photos or videos...
          </DialogDescription>
        </DialogHeader>

        <Input
          onChange={(e) => setHighlight(e.target.value)}
          placeholder="Add Highlight..."
        />

        <label htmlFor="file" className="cursor-pointer">
          <input
            onChange={(e) => setStory(e.target.files?.[0] || null)}
            accept="image/*"
            className="hidden"
            type="file"
            id="file"
          />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 justify-center">
                Press to add <BsFilePlus size={20} />
              </CardTitle>
              <CardDescription className="flex items-center justify-center">
                The Story will last for 24 Hours.
              </CardDescription>
            </CardHeader>
            {Story != null && (
              <CardContent className="flex items-center justify-center">
                <FaCircleCheck size={30} />
              </CardContent>
            )}

            {Story != null && Story?.size != 0 ? (
              <CardFooter className="w-full">
                <Button
                  onClick={shareStory}
                  className="w-full flex items-center gap-3"
                >
                  {loading ? (
                    <CircularProgress size={13} color="inherit" />
                  ) : (
                    <>
                      <TbCalendarShare size={20} />
                      Share
                    </>
                  )}
                </Button>
              </CardFooter>
            ) : (
              <></>
            )}
          </Card>
        </label>
      </DialogContent>
    </Dialog>
  );
};

export default StoryPopUp;
