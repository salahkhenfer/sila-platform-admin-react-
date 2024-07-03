import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { PiSubtitlesFill } from "react-icons/pi";
import { TbTrashFilled } from "react-icons/tb";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { motion } from "framer-motion";
import { DeleteStory } from "../utils/deleteStory";
import { DeleteFile } from "../utils/deleteFile";
import CircularProgress from "@mui/material/CircularProgress";

type StoryProps = {
  story: {
    Story: string;
    story: string;
    id: string;
    title: string;
  };
};

const Story = ({ story }: StoryProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteStory = async () => {
    setLoading(true);

    await DeleteFile(story.Story);
    await DeleteStory(story.id);
    window.location.reload();
  };

  return (
    <div className="w-[14rem] h-[14rem] mx-auto relative overflow-hidden">
      <Dialog>
        <DialogTrigger>
          <Card className="w-[14rem] h-[14rem] relative overflow-hidden">
            <img src={story.story} alt="Story image" />
          </Card>
        </DialogTrigger>
        <DialogContent className="h-full overflow-hidden bg-transparent border-0">
          <img src={story.story} alt="Story image" />
          <div className="z-10 h-fit mt-5">
            <div className="w-full h-[.2rem] bg-gray-300 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ type: "tween", duration: 20 }}
                className="h-full bg-black rounded-full"
              />
            </div>
          </div>

          <p className="z-10 absolute top-[3rem] p-3 text-[13px] font-semibold text-gray-400">
            {story.title}
          </p>
        </DialogContent>
      </Dialog>
      {/* Drop down menu */}
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute z-10 top-5 right-5">
          <PiDotsThreeCircleFill size={30} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Stories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div>
            <Button className="block" variant="outline">
              <Dialog>
                <DialogTrigger className="flex items-center gap-2">
                  <PiSubtitlesFill /> Highlighting
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Story Highlighting</DialogTitle>
                    <DialogDescription className="flex items-center gap-3">
                      <PiSubtitlesFill size={30} />
                      {story.title}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </Button>
            <Button className="block w-full" variant="outline">
              <AlertDialog>
                <AlertDialogTrigger className="flex items-center gap-2">
                  <TbTrashFilled /> Remove
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the Story and remove it's data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={deleteStory}>
                      {loading ? (
                        <CircularProgress size={13} color="inherit" />
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Story;
