"use client";

import React, { useEffect, useContext } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { BsKeyboardFill } from "react-icons/bs";
import { RiUploadCloudFill } from "react-icons/ri";
import { FaLink } from "react-icons/fa6";
import { CiTextAlignLeft } from "react-icons/ci";
import { HiSelector } from "react-icons/hi";
import { PiNotepadBold } from "react-icons/pi";
import { useState } from "react";
import { Button } from "./ui/button";
import { LuSaveAll } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { TiWarning } from "react-icons/ti";
import { SponsorContext } from "../Pages/Sponsor";

const goalStep = ({ index }: { index: number }) => {
  //Context for state management
  const { steps, setSteps } = useContext(SponsorContext);

  //Normal states
  const [stepTitle, setStepTitle] = useState<string>("");
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [stepType, setStepType] = useState<string>("");
  const [stepContent, setStepContent] = useState<string>("");
  const [itemsNumber, setItemsNumber] = useState<number>(0);
  const [items, setItems] = useState(Array(itemsNumber | 0).fill(""));
  const [note, setNote] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    setSaved(false);
  }, [stepTitle, stepNumber, stepType, stepContent, itemsNumber, items, note]);

  const saveStep = () => {
    setSteps((prev: any) => [
      ...prev,
      {
        stepTitle: stepTitle,
        stepNumber: stepNumber,
        stepType: stepType,
        stepContent: stepContent,
        itemsNumber: itemsNumber,
        items: items,
        note: note,
      },
    ]);

    setSaved(true);
  };

  return (
    <div
      key={index}
      className="flex flex-col gap-3 border-b-[1px] border-slate-500 pb-5"
    >
      <div className="flex items-center justify-between">
        {saved ? (
          <div className="flex items-center gap-3 p-1 pl-3 pr-3 bg-slate-300 rounded-full">
            <FaCheck /> <p className="text-[14px] font-medium">Saved</p>
          </div>
        ) : (
          <Button
            onClick={saveStep}
            className="flex items-center gap-3 rounded-full bg-slate-500"
          >
            <LuSaveAll /> Save Step
          </Button>
        )}

        <div className="flex items-center gap-4 p-1 pl-4 pr-4 rounded-lg bg-yellow-300 max-w-[30rem]">
          <TiWarning size={30} />
          <p className="text-[14px] font-medium">
            Please make sure you save each step, otherwise they won't be created
            when you press finish!
          </p>
        </div>
      </div>

      <div className="flex items-center w-full justify-between gap-3">
        <Input
          value={stepTitle}
          onChange={(e) => setStepTitle(e.target.value)}
          placeholder="Step title..."
        />
        <Input
          value={stepNumber}
          onChange={(e) => setStepNumber(parseInt(e.target.value))}
          type="number"
          placeholder="Step number..."
        />
      </div>

      <div className="flex items-center w-full justify-between gap-3">
        <Select value={stepType} onValueChange={setStepType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Step type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="input">
              <div className="flex items-center gap-3">
                <BsKeyboardFill />
                <p>Input</p>
              </div>
            </SelectItem>
            <SelectItem value="upload">
              <div className="flex items-center gap-3">
                <RiUploadCloudFill />
                <p>File upload</p>
              </div>
            </SelectItem>
            <SelectItem value="link">
              <div className="flex items-center gap-3">
                <FaLink />
                <p>Link</p>
              </div>
            </SelectItem>
            <SelectItem value="text">
              <div className="flex items-center gap-3">
                <CiTextAlignLeft />
                <p>Text</p>
              </div>
            </SelectItem>
            <SelectItem value="select">
              <div className="flex items-center gap-3">
                <HiSelector />
                <p>Select</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {stepType == "input" && (
          <Input
            value={stepContent}
            onChange={(e) => setStepContent(e.target.value)}
            placeholder="Input placeholder..."
          />
        )}

        {stepType == "link" && (
          <Input
            value={stepContent}
            onChange={(e) => setStepContent(e.target.value)}
            placeholder="Insert link..."
          />
        )}

        {stepType == "text" && (
          <Input
            value={stepContent}
            onChange={(e) => setStepContent(e.target.value)}
            placeholder="Insert text..."
          />
        )}

        {stepType == "select" && (
          <Input
            value={itemsNumber}
            onChange={(e) => setItemsNumber(parseInt(e.target.value))}
            type="number"
            placeholder="items number..."
          />
        )}
      </div>

      {stepType == "select" && (
        <>
          {Array.from({ length: itemsNumber }).map((_, index) => (
            <Input
              value={items[index]}
              onChange={(e) => {
                const newValues = [...items];
                newValues[index] = e.target.value;
                setItems(newValues);
              }}
              key={index}
              placeholder={`item ${index + 1}...`}
            />
          ))}
        </>
      )}

      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-3">
          <PiNotepadBold /> Note
        </p>
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note..."
        />
      </div>
    </div>
  );
};

export default goalStep;
