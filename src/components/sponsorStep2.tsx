import { useEffect, useState } from "react";
import { IoTime } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SponsorStep2 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //Getting search params
  const searchParams = new URLSearchParams(location.search);
  const goalNameParam = searchParams.get("goalName");
  const goalPriceParam = searchParams.get("goalPrice");
  const currencyParam = searchParams.get("currency");
  const durationParam = searchParams.get("duration");
  const durationTypeParam = searchParams.get("durationType");

  //Normal states
  const [goalName, setGoalName] = useState(goalNameParam || "");
  const [goalPrice, setGoalPrice] = useState(
    goalPriceParam ? parseInt(goalPriceParam) : 0
  );
  const [currency, setCurrency] = useState(currencyParam || "");
  const [duration, setDuration] = useState(
    durationParam ? parseInt(durationParam) : 0
  );
  const [durationType, setDurationType] = useState(durationTypeParam || "");

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(location.search);
    params.set(key, value);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  useEffect(() => {
    updateSearchParams("goalName", goalName);
  }, [goalName]);

  useEffect(() => {
    updateSearchParams("goalPrice", String(goalPrice));
  }, [goalPrice]);

  useEffect(() => {
    updateSearchParams("currency", currency);
  }, [currency]);

  useEffect(() => {
    updateSearchParams("duration", String(duration));
  }, [duration]);

  useEffect(() => {
    updateSearchParams("durationType", durationType);
  }, [durationType]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("new", "");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <Input
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          placeholder="Goal name..."
        />
        <Input
          value={goalPrice}
          onChange={(e) => setGoalPrice(parseInt(e.target.value))}
          placeholder="Goal price..."
          type="number"
        />
      </div>

      <Select value={currency} onValueChange={setCurrency}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dollar">Dollar</SelectItem>
          <SelectItem value="euro">Euro</SelectItem>
          <SelectItem value="dinar">Dinar</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center justify-between gap-4">
        <Input
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          placeholder="Duration..."
          type="number"
        />
        <Select value={durationType} onValueChange={setDurationType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Duration type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="second">
              <div className="flex items-center gap-2">
                <IoTime />
                <p>Second</p>
              </div>
            </SelectItem>
            <SelectItem value="minute">
              <div className="flex items-center gap-2">
                <IoTime />
                <p>Minute</p>
              </div>
            </SelectItem>
            <SelectItem value="hour">
              <div className="flex items-center gap-2">
                <IoTime />
                <p>Hour</p>
              </div>
            </SelectItem>
            <SelectItem value="day">
              <div className="flex items-center gap-2">
                <IoTime />
                <p>Day</p>
              </div>
            </SelectItem>
            <SelectItem value="week">
              <div className="flex items-center gap-2">
                <IoTime />
                <p>Week</p>
              </div>
            </SelectItem>
            <SelectItem value="month">
              <div className="flex items-center gap-2">
                <IoTime />
                <p>Month</p>
              </div>
            </SelectItem>
            <SelectItem value="year">
              <div className="flex items-center gap-2">
                <IoTime />
                <p>Year</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SponsorStep2;
