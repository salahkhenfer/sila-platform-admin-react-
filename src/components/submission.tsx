"use client";

import { useContext, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

import CircularProgress from "@mui/material/CircularProgress";
import { BsFillTrash2Fill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { SubmissionContext } from "../Pages/Dashboard";
import { DeleteFile } from "../utils/deleteFile";
import { DeleteSubmission } from "../utils/deleteSubmission";
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
import { Button } from "./ui/button";

const submission = ({ submission }: { submission: any }) => {
  const { setSelectedSubmission } = useContext(SubmissionContext);

  const [loading, setLoading] = useState(false);

  const deleteSubmission = async () => {
    setLoading(true);
    if (submission.product_photo != "") {
      await DeleteFile(submission.product_photo);
    }

    if (submission.product_video != "") {
      await DeleteFile(submission.product_video);
    }

    await DeleteSubmission(submission.id);
    window.location.reload();
  };

  return (
    <div>
      <div className="max-md:hidden grid  max-md:grid-cols-1 grid-cols-4 md:min-w-[calc(100vw - 3rem)] w-full max-h-full md:overflow-auto">
        <div className=" py-1 px-5 flex items-center gap-3 border-b-[2px] border-[#EAECF0]">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="outline" size="icon">
                <BsFillTrash2Fill />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure, you want to delete?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  submission and remove it's data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button onClick={deleteSubmission}>
                  {loading ? (
                    <CircularProgress size={13} color="inherit" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <p>{submission.goal}</p>
        </div>

        <div className="px-5  py-1 border-b-[2px] border-[#EAECF0]">
          {submission.situation == "Pending" && (
            <Button className="rounded-full px-10 bg-[#555555]">
              {submission.situation}
            </Button>
          )}
          {submission.situation == "In Process" && (
            <Button className="rounded-full px-10 bg-[#FEA842]">
              {submission.situation}
            </Button>
          )}
          {submission.situation == "Done" && (
            <Button className="rounded-full px-10 bg-[#59B25A]">
              {submission.situation}
            </Button>
          )}
          {submission.situation == "Rejected" && (
            <Button className="rounded-full px-10 bg-[#DA1E28]">
              {submission.situation}
            </Button>
          )}
        </div>

        <div className="px-5  py-1 border-b-[2px] border-[#EAECF0]">
          <Link
            onClick={() => setSelectedSubmission(submission)}
            to={"/profile"}
          >
            <Button className="rounded-full px-10 bg-[#7538D4]">
              See profile
            </Button>
          </Link>
        </div>

        <div className="px-5 flex items-center gap-3 border-b-[2px] border-[#EAECF0]">
          {submission.paid ? (
            <>
              <FaCircleCheck size={20} />
              <p>Paid</p>
            </>
          ) : (
            <>
              <IoIosCloseCircle size={20} />
              <p>Not Paid</p>
            </>
          )}
        </div>
      </div>
      <div className="px-2 md:hidden">
        <div className="flex justify-between  items-center w-full border-y-[2px] border-[#EAECF0]">
          <div className="bg-[#F9FAFB]  flex items-center gap-3 px-5 ">
            <p>Name</p>
          </div>
          <div className=" flex items-center gap-3 ">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="outline" size="icon">
                  <BsFillTrash2Fill />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure, you want to delete?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the submission and remove it's data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button onClick={deleteSubmission}>
                    {loading ? (
                      <CircularProgress size={13} color="inherit" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <p>{submission.goal}</p>
          </div>
        </div>

        {/* disktpo */}
        <div className="flex justify-between items-center w-full border-b-[2px] border-[#EAECF0]">
          <div className="  flex items-center gap-3 py-2 px-5 ">
            <p>Our work</p>
          </div>

          <div className=" border-b-[2px] border-[#EAECF0]">
            {submission.situation == "Pending" && (
              <Button className="rounded-full px-10 bg-[#555555]">
                {submission.situation}
              </Button>
            )}
            {submission.situation == "In Process" && (
              <Button className="rounded-full px-10 bg-[#FEA842]">
                {submission.situation}
              </Button>
            )}
            {submission.situation == "Done" && (
              <Button className="rounded-full px-10 bg-[#59B25A]">
                {submission.situation}
              </Button>
            )}
            {submission.situation == "Rejected" && (
              <Button className="rounded-full px-10 bg-[#DA1E28]">
                {submission.situation}
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center w-full border-b-[2px] border-[#EAECF0]">
          <div className="bg-[#F9FAFB]  flex items-center gap-3 py-2 px-5">
            <p>Client profile</p>
          </div>

          <div className=" border-b-[2px] border-[#EAECF0]">
            <Link
              onClick={() => setSelectedSubmission(submission)}
              to={"/profile"}
            >
              <Button className="rounded-full px-8 bg-[#7538D4]">
                See profile
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex px-5 justify-between items-center w-full border-b-[2px] border-[#EAECF0]">
          <div className=" flex items-center  py-2  ">
            <p>Payment status</p>
          </div>
          <div className=" flex items-center gap-3 ">
            {submission.paid ? (
              <>
                <FaCircleCheck size={20} />
                <p>Paid</p>
              </>
            ) : (
              <>
                <IoIosCloseCircle size={20} />
                <p>Not Paid</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default submission;
