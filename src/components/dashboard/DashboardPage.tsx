import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { Checkbox } from "../../components/ui/checkbox";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";
import Submission from "../../components/submission";
import { GetSubmissions } from "../../utils/getSubmissions";
import { TbReportMoney } from "react-icons/tb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { GetPricing } from "../../utils/getPricing";
import { UpdateConversion } from "../../utils/updateConversionPrice";
import { UpdateMessage } from "../../utils/updateMessagePrice";
import CircularProgress from "@mui/material/CircularProgress";

const DashboardPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [conversionPrice, setConversionPrice] = useState("");
  const [messagePrice, setMessagePrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await GetSubmissions();
      setSubmissions(data.submittions);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await GetPricing();
      setConversionPrice(data.conversion_price);
      setMessagePrice(data.message_price);
    })();
  }, []);

  const updatePrice = async () => {
    setLoading(true);
    await UpdateConversion(parseInt(conversionPrice));
    await UpdateMessage(parseInt(messagePrice));
    window.location.reload();
  };

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center  py-2">
      <Dialog>
        <DialogTrigger>
          <Button className=" ">
            <TbReportMoney size={20} />
            Change pricing
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pricing settings</DialogTitle>
            <DialogDescription>
              Change pricing for conversion or message sponsorships down below
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            Conversion price
            <div className="flex items-center gap-2">
              <Input
                value={conversionPrice}
                onChange={(e) => setConversionPrice(e.target.value)}
                placeholder="conversion price..."
                type="number"
              />
              <p>DA</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            Message price
            <div className="flex items-center gap-2">
              <Input
                value={messagePrice}
                onChange={(e) => setMessagePrice(e.target.value)}
                placeholder="message price..."
                type="number"
              />
              <p>DA</p>
            </div>
          </div>

          <Button onClick={updatePrice}>
            {loading ? (
              <CircularProgress size={13} color="inherit" />
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogContent>
      </Dialog>

      {/* <div className="flex items-center justify-end gap-5 mr-10 min-w-[50rem]">
        <Button className="flex items-center gap-12" variant="outline">
          <p>Newest</p>
          <IoIosArrowDown />
        </Button>
        <Button className="flex items-center gap-12" variant="outline">
          <p>All clients</p>
          <IoIosArrowDown />
        </Button>
        <Button className="flex items-center gap-12" variant="outline">
          <p>Service</p>
          <IoIosArrowDown />
        </Button>
      </div> */}

      <div className="grid max-md:hidden max-md:grid-cols-1 grid-cols-4 md:min-w-[calc(100vw - 3rem)] w-full max-h-full md:overflow-auto ">
        {/* <div className="grid grid-cols-4 max-h-full overflow-auto min-w-[50rem]"> */}
        <div className="bg-[#F9FAFB] max-md:hidden flex items-center gap-3 py-2 px-5 border-b-[2px] border-[#EAECF0]">
          <Checkbox />
          <p>Name</p>
        </div>
        <div className="bg-[#F9FAFB] max-md:hidden flex items-center gap-3 py-2 px-5 border-b-[2px] border-[#EAECF0]">
          <p>Our work</p>
        </div>
        <div className="bg-[#F9FAFB] max-md:hidden flex items-center gap-3 py-2 px-5 border-b-[2px] border-[#EAECF0]">
          <p>Client profile</p>
        </div>
        <div className="bg-[#F9FAFB] max-md:hidden flex items-center gap-3 py-2 px-5 border-b-[2px] border-[#EAECF0]">
          <p>Payment status</p>
        </div>
        {/* Down */}
      </div>
      {submissions.map((submission) => (
        <div className="w-full">
          <Submission submission={submission} />
          <div className="h-5 md:hidden w-full-"></div>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
