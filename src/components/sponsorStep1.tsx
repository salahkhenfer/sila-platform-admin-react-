"use client";

import React, { useEffect, useState, useContext } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FaMeta } from "react-icons/fa6";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoIosCloudUpload } from "react-icons/io";
import { Button } from "./ui/button";
import { IoIosCloseCircle } from "react-icons/io";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { SponsorContext } from "../Pages/Sponsor";
import { useLocation, useNavigate } from "react-router-dom";

const sponsorStep1 = () => {
  //Context data for state management
  const { file, setFile } = useContext(SponsorContext);

  //Search params initialization
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const pathName = location.pathname;

  const replace = (path) => {
    navigate(path, { replace: true });
  };

  //Getting search params
  const sponsorNameParam = searchParams.get("sponsorName");
  const platformParam = searchParams.get("platform");

  //Normal states
  const [sponsorName, setSponsorName] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");

  //Injecting search params with data
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("sponsorName", sponsorName);
    replace(`${pathName}?${params.toString()}`);
  }, [sponsorName]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("platform", platform);
    replace(`${pathName}?${params.toString()}`);
  }, [platform]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("new", "");
    replace(`${pathName}?${params.toString()}`);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center max-md:flex-col justify-between gap-5">
        <Input
          onChange={(e) => setSponsorName(e.target.value)}
          placeholder="Sponsor name..."
        />
        <p className="text-[13px] font-semibold">OR</p>
        <Select value={platformParam?.toString()} onValueChange={setPlatform}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Meta">
              <div className="flex items-center gap-5">
                <FaMeta />
                <p>Meta</p>
              </div>
            </SelectItem>
            <SelectItem value="Snapchat">
              <div className="flex items-center gap-5">
                <FaSnapchatGhost />
                <p>Snapchat</p>
              </div>
            </SelectItem>
            <SelectItem value="TikTok">
              <div className="flex items-center gap-5">
                <FaTiktok />
                <p>TikTok</p>
              </div>
            </SelectItem>
            <SelectItem value="Instagram">
              <div className="flex items-center gap-5">
                <FaInstagram />
                <p>Instagram</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <label
        htmlFor="file"
        className="w-full h-[10rem] border-[3px] border-dotted border-black rounded-lg flex items-center justify-center cursor-pointer"
      >
        <input
          onChange={(e) => setFile(e.target.files?.[0])}
          className="hidden"
          type="file"
          id="file"
        />
        <div className="flex flex-col items-center gap-3">
          <IoIosCloudUpload size={30} />
          {file != null ? (
            <div className="border-[1px] border-slate-300 rounded-md p-1 pl-5 pr-20 flex items-center gap-4 relative">
              <p>{file.name}</p>
              <Button
                onClick={() => setFile(null)}
                variant="ghost"
                className="absolute right-0 top-[50%] translate-y-[-50%]"
              >
                <IoIosCloseCircle size={20} />
              </Button>
            </div>
          ) : (
            <p>Upload an icon for the Sponsor platform</p>
          )}
        </div>
      </label>
    </div>
  );
};

export default sponsorStep1;
