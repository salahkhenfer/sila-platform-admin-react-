"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { PiLadderLight } from "react-icons/pi";
import GoalStep from "./goalStep";

const sponsorStep3 = () => {
  const [stepsNumber, setStepsNumber] = useState<number>(1);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end w-full">
        <Button
          onClick={() => setStepsNumber(stepsNumber + 1)}
          className="flex items-center gap-3"
        >
          <PiLadderLight /> Add Step
        </Button>
      </div>

      {/* Steps */}
      {Array.from({ length: stepsNumber }).map((_, index) => (
        <GoalStep index={index} />
      ))}
    </div>
  );
};

export default sponsorStep3;
