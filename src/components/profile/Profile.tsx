"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { BsFillTrash2Fill } from "react-icons/bs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { FaMeta } from "react-icons/fa6";
import { Checkbox } from "../../components/ui/checkbox";
import { IoVideocamOutline } from "react-icons/io5";
import { HiOutlinePhoto } from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { Textarea } from "../../components/ui/textarea";

import { IoClose } from "react-icons/io5";
import { IoVideocamOffOutline } from "react-icons/io5";
import { TbPhotoOff } from "react-icons/tb";
import { GetUserInfo } from "../../utils/getSubmissionUser";
import { UpdateStatus } from "../../utils/updateSubmissionStatus";
import CircularProgress from "@mui/material/CircularProgress";
import { UpdateRejectionNote } from "../../utils/updateSubmissionRejectionNote";
import { SubmissionContext } from "../../Pages/Dashboard";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const replace = (path) => {
    navigate(path, { replace: true });
  };

  const searchParams = new URLSearchParams(location.search);
  const pathName = location.pathname;

  const { selectedSubmission } = useContext(SubmissionContext);

  useEffect(() => {
    const param = searchParams.get("submission");
    if (param == null) {
      const params = new URLSearchParams(searchParams);
      params.set("new", "");
      params.set("submission", JSON.stringify(selectedSubmission));
      replace(`${pathName}?${params.toString()}`);
    }
  }, []);

  const param = searchParams.get("submission");
  const submission = JSON.parse(param);

  //Getting user info
  const [userInfo, setUserInfo] = useState<any>("");

  useEffect(() => {
    if (submission != null) {
      (async () => {
        const data = await GetUserInfo(submission?.id);
        setUserInfo(data.user);
      })();
    }
  }, [submission]);

  //Changing status
  const [statusLoading, setStatusLoading] = useState(false);

  const setInProcessSubmission = async () => {
    await UpdateStatus(submission?.id, "In Process");
    setStatusLoading(true);

    replace("/dashboard");
  };
  const setDoneSubmission = async () => {
    await UpdateStatus(submission?.id, "Done");
    setStatusLoading(true);
    replace("/dashboard");
  };
  const setRejectedSubmission = async () => {
    await UpdateStatus(submission?.id, "Rejected");
    setStatusLoading(true);
    replace("/dashboard");
  };

  //Rejecting submission
  const [rejectionNote, setRejectionNote] = useState("");
  const [rejectionLoading, setRejectionLoading] = useState(false);

  const RejectSubmission = async () => {
    await UpdateStatus(submission?.id, "Rejected");
    await UpdateRejectionNote(submission?.id, rejectionNote);
    setRejectionLoading(true);
    replace("/dashboard");
  };

  return (
    <div className="h-screen w-full md:p-10 flex flex-col gap-5 max-h-screen ;d.overflow-auto">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-semibold">{submission?.goal} Sponsorship</p>

        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              {submission?.situation == "Pending" && (
                <Button className="px-10 py-5 border-[2px] border-[#555555] rounded-xl bg-[#555555]">
                  Pending
                </Button>
              )}
              {submission?.situation == "In Process" && (
                <Button className="px-10 py-5 border-[2px] border-[#FEA842] rounded-xl bg-[#FEA842]">
                  In Process
                </Button>
              )}
              {submission?.situation == "Done" && (
                <Button className="px-10 py-5 border-[2px] border-[#59B25A] rounded-xl bg-[#59B25A]">
                  Done
                </Button>
              )}
              {submission?.situation == "Rejected" && (
                <Button className="px-10 py-5 border-[2px] border-[#DA1E28] rounded-xl bg-[#DA1E28]">
                  Rejected
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Status settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {statusLoading ? (
                <CircularProgress size={15} color="primary" />
              ) : (
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={setInProcessSubmission}
                    className="flex items-center gap-2"
                  >
                    <MdOutlineAccessTimeFilled size={20} />
                    <p>In Process</p>
                  </Button>
                  <Button
                    onClick={setDoneSubmission}
                    className="flex items-center gap-2"
                  >
                    <FaCircleCheck size={20} />
                    <p>Done</p>
                  </Button>
                  <Button
                    onClick={setRejectedSubmission}
                    className="flex items-center gap-2"
                  >
                    <IoIosCloseCircle size={20} />
                    <p>Rejected</p>
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger>
              <Button className="py-5 rounded-xl bg-transparent border-[2px] border-[red] text-[red] flex items-center gap-2">
                <p>Refuse submission</p>
                <BsFillTrash2Fill size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <div className="flex justify-center">
                  <img
                    src="/delete-image.png"
                    alt="delete image"
                    height={100}
                    width={100}
                  />
                </div>
              </DialogHeader>

              <p className="text-center text-[15px] font-semibold">
                Tell the client why are you refusing this sponsoring
              </p>
              <Textarea
                onChange={(e) => setRejectionNote(e.target.value)}
                rows={10}
                placeholder="We refusing this demand because your profil ...."
              />
              <div className="flex items-center gap-3 justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="px-20"
                >
                  Cancel
                </Button>
                <Button onClick={RejectSubmission} className="px-20 bg-[red]">
                  {rejectionLoading ? (
                    <CircularProgress size={13} color="inherit" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="underline">Account Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 md:flex-row md:items-center md:gap-20">
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Account name</p>
            <p className="text-[14px] font-medium">{userInfo.user_name}</p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-semibold">Email</p>
            <p className="text-[14px] font-medium">{userInfo.email}</p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-semibold">Phone number</p>
            <p className="text-[14px] font-medium">{userInfo.phone}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="underline flex items-center gap-2">
            <FaMeta />
            <p>Meta</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-20">
            <div className="flex flex-col gap-3">
              <p>Page Facebook URL</p>
              <Input value={submission?.fb_page_link} disabled />
            </div>

            <div className="flex flex-col gap-3">
              <p>Post link product page</p>
              <Input value={submission?.post_link} disabled />
            </div>
          </div>

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-20">
            <div className="flex flex-col gap-3">
              <p>Domain name</p>
              <Input value={submission?.domain} disabled />
            </div>

            <div className="flex flex-col gap-3">
              <p>Email</p>
              <Input value={submission?.email} disabled />
            </div>

            <div className="flex flex-col gap-3">
              <p>Password</p>
              <Input value={submission?.password} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        {submission?.paid ? (
          <>
            <Checkbox checked />
            <p className="font-semibold">
              This account has completed the payment process
            </p>
          </>
        ) : (
          <>
            <IoClose size={20} />
            <p className="font-semibold">
              This account did not complete the payment process
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col gap-5 items-start md:flex-row md:items-center">
        <Dialog>
          <DialogTrigger>
            <Button className="py-5 rounded-xl flex items-center gap-2 border-[2px] border-[#8A58EA] bg-[#8A58EA]">
              <p>Show video</p>
              <IoVideocamOutline size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            {submission?.product_video != "" ? (
              <video
                className="h-[22rem] w-full object-cover"
                src={submission?.product_video}
                controls
              ></video>
            ) : (
              <div className="w-full h-[22rem] flex items-center justify-center">
                <IoVideocamOffOutline size={70} />
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <Button className="py-5 rounded-xl flex items-center gap-2 border-[2px] border-[#8A58EA] bg-[#8A58EA]">
              <p>Show photo</p>
              <HiOutlinePhoto size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="w-full h-[22rem] relative">
              {submission?.product_photo != "" ? (
                <img
                  src={submission?.product_photo}
                  alt="submission image"
                  fill
                  objectFit="cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <TbPhotoOff size={70} />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
