import { useState } from "react";
import { Progress } from "./ui/progress";
import clsx from "clsx";

const StepsProgress = ({ step }: { step: number }) => {
  return (
    <div className="border-b-[1px] border-slate-300 p-5 flex items-center gap-3">
      <div className="w-[30px] min-w-[30px] h-[30px] min-h-[30px] rounded-full bg-black flex items-center justify-center text-white">
        1
      </div>
      <Progress value={step >= 2 ? 100 : 30} />
      <div
        className={clsx(
          "w-[30px] min-w-[30px] h-[30px] min-h-[30px] rounded-full border-[2px] border-black flex items-center justify-center text-black",
          {
            "bg-black text-white": step >= 2,
          }
        )}
      >
        2
      </div>
      <Progress value={step == 3 ? 100 : 0} />
      <div
        className={clsx(
          "w-[30px] min-w-[30px] h-[30px] min-h-[30px] rounded-full border-[2px] border-black flex items-center justify-center text-black",
          {
            "bg-black text-white": step == 3,
          }
        )}
      >
        3
      </div>
    </div>
  );
};

export default StepsProgress;
