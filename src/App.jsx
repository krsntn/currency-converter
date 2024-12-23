import { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDebounce from "./useDebounce";

const App = () => {
  const [inputValue, setInputValue] = useState(1000);
  const [rate, setRate] = useState(2);
  const [gap, setGap] = useState(10);
  const [tableValues, setTableValues] = useState([]);
  const scrollRef = useRef(null);

  const debouncedInputValue = useDebounce(inputValue, 600);
  const debouncedRateValue = useDebounce(rate, 600);
  const debouncedGapValue = useDebounce(gap, 600);

  useEffect(() => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);

    const localValue = localStorage.getItem("value");
    if (localValue) setInputValue(localValue);

    const localRate = localStorage.getItem("rate");
    if (localRate) setRate(localRate);

    const localGap = localStorage.getItem("gap");
    if (localGap) setGap(localGap);
  }, []);

  useEffect(() => {
    const arr = [];
    const inputNum = Number(debouncedInputValue);
    const gapNum = Number(debouncedGapValue);

    for (let i = inputNum - gapNum, x = 10; i > 0 && x > 0; i -= gapNum, x--) {
      arr.unshift([i, i * debouncedRateValue]);
    }
    for (let i = inputNum, x = 10; x >= 0; i += gapNum, x--) {
      arr.push([i, i * debouncedRateValue]);
    }

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight / 2.5;

    setTableValues(arr);
  }, [debouncedInputValue, debouncedRateValue, debouncedGapValue]);

  const inputValueChanged = (event) => {
    const { value } = event.target;
    localStorage.setItem("value", value);
    setInputValue(value);
  };

  const rateChanged = (event) => {
    const { value } = event.target;
    localStorage.setItem("rate", value);
    setRate(value);
  };

  const gapChanged = (event) => {
    const { value } = event.target;
    localStorage.setItem("gap", value);
    setGap(value);
  };

  const formatterMYR = Intl.NumberFormat("en", {
    style: "currency",
    currency: "MYR",
  });

  const formatterFC = Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  });

  return (
    <div className="p-4 m-auto min-h-[100dvh] w-full max-w-lg flex flex-col justify-between gap-4">
      <div className="grid items-center gap-4">
        <div className="grid items-center gap-2">
          <Label htmlFor="fc">Foreign Currency</Label>
          <Input
            id="fc"
            type="number"
            inputMode="decimal"
            value={inputValue}
            onFocus={(e) => e.target.select()}
            onChange={inputValueChanged}
            className="text-center text-lg"
          />
        </div>

        <div className="grid items-center gap-2">
          <Label htmlFor="rate">Exchange Rate</Label>
          <Input
            id="rate"
            type="number"
            inputMode="decimal"
            value={rate}
            onFocus={(e) => e.target.select()}
            onChange={rateChanged}
            className="text-center text-lg"
          />
        </div>
      </div>

      <div
        className="overflow-auto h-[calc(100dvh-266px)] no-scrollbar"
        ref={scrollRef}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2 text-center">
                Foreign Currency
              </TableHead>
              <TableHead className="w-1/2 text-center">MYR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableValues.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  className={`${
                    row[0] === Number(inputValue)
                      ? "bg-gray-700 font-black text-lg"
                      : ""
                  }`}
                >
                  <TableCell>{formatterFC.format(row[0])}</TableCell>
                  <TableCell>{formatterMYR.format(row[1])}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="grid items-center gap-2 shrink-0">
        <Label htmlFor="gap">Gap</Label>
        <Input
          id="gap"
          type="number"
          inputMode="numeric"
          value={gap}
          onFocus={(e) => e.target.select()}
          onChange={gapChanged}
          className="text-center text-lg"
        />
      </div>
    </div>
  );
};

export default App;
