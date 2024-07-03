import { useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import SponsorStep1 from "../../components/sponsorStep1";
import SponsorStep3 from "../../components/sponsorStep3";
import SponsorStep2 from "../../components/sponsorStep2";
import StepsProgress from "../../components/stepsProgress";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import CircularProgress from "@mui/material/CircularProgress";
import { FaCheck } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { VscTools } from "react-icons/vsc";
// import { To, useLocation, useNavigate } from "react-router-dom";
// import { SponsorContext, SponsorContextType } from "../../Pages/Sponsor";
// import { AddGoal } from "../../utils/addGoal";
// import { AddItem } from "../../utils/addItem";
// import { AddSponsor } from "../../utils/addSponsor";
// import { AddStep } from "../../utils/addStep";
// import { UploadFile } from "../../utils/upload";
// import { Step } from "@mui/material";

const SponsorPage = () => {
  //Context for state
  // const location = useLocation();

  // const { file, steps } = useContext<SponsorContextType>(SponsorContext);

  // //Search params initialization
  // const navigate = useNavigate();

  // const searchParams = new URLSearchParams(location.search);
  // // const pathName = location.pathname;

  // const replace = (path: To) => {
  //   navigate(path, { replace: true });
  // };

  //Getting step 1 search params
  // const sponsorNameParam = searchParams.get("sponsorName");
  // const platformParam = searchParams.get("platform");

  //Getting step 2 search params
  // const goalNameParam = searchParams.get("goalName");
  // const goalPriceParam = searchParams.get("goalPrice");
  // const currencyParam = searchParams.get("currency");
  // const durationParam = searchParams.get("duration");
  // const durationTypeParam = searchParams.get("durationType");

  //Normal states
  const [stepsNum, setStepsNum] = useState<number>(1);
  const [loading] = useState<boolean>(false);

  // const finishProccess = async () => {
  //   setLoading(true);

  //   // let sponsorIcon = "";

  //   // if (file != null) {
  //   //   const fileUrl = await UploadFile(file);
  //   //   sponsorIcon = fileUrl;
  //   // }

  //   // const sponsorData = await AddSponsor(
  //   //   String(sponsorNameParam),
  //   //   String(platformParam),
  //   //   String(sponsorIcon)
  //   // );
  //   // const goalData = await AddGoal(
  //   //   String(goalNameParam),
  //   //   String(sponsorData.sponsor.id),
  //   //   Number(goalPriceParam),
  //   //   String(currencyParam),
  //   //   Number(durationParam),
  //   //   String(durationTypeParam)
  //   // );
  //   // steps.map(async (item: Step) => {
  //   //   const stepData = await AddStep(
  //   //   String(goalData.sponsor_goal.id),
  //   //   Number(item.stepNumber),
  //   //   String(item.stepTitle),
  //   //   String(item.stepType),
  //   //   String(item.stepContent),
  //   //   String(item.note)
  //   //   );
  //   //   // item.items.map((x: string) => {
  //   //   // // const itemData = AddItem(String(stepData.step.id), String(x));
  //   //   // });
  //   // });

  //   replace("/dashboard");
  //   setLoading(false);
  // };

  return (
    <div className="w-full h-screen flex flex-col items-center md:px-10">
      <div className=" flex items-center gap-3 p-3 bg-[red] text-white rounded-xl top-0">
        <IoIosWarning />
        <p>
          This feature is not working yet. It is still under development, please
          don't use it!
        </p>
        <VscTools />
      </div>
      <Card className="w-full max-h-[30rem] ">
        <StepsProgress step={stepsNum} />
        <CardHeader>
          <CardTitle>Welcome to Sponsor configuration!</CardTitle>
          <CardDescription>
            In this section you can add sponsors, goals, and even steps for each
            goal...
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stepsNum == 1 && <SponsorStep1 />}
          {stepsNum == 2 && <SponsorStep2 />}
          {stepsNum == 3 && <SponsorStep3 />}
        </CardContent>
        <CardFooter className="flex items-center gap-3">
          {stepsNum > 1 && (
            <Button
              variant="outline"
              onClick={() => setStepsNum(stepsNum - 1)}
              className="w-full flex items-center gap-5"
            >
              <SlArrowLeft /> Go Back
            </Button>
          )}

          {stepsNum != 3 ? (
            <Button
              onClick={() => setStepsNum(stepsNum + 1)}
              className="w-full flex items-center gap-5"
            >
              Continue <SlArrowRight />
            </Button>
          ) : (
            <Button
              // onClick={finishProccess}
              className="w-full flex items-center gap-5"
            >
              {loading ? (
                <CircularProgress size={13} color="inherit" />
              ) : (
                <>
                  <p>Finish</p>
                  <FaCheck />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SponsorPage;
