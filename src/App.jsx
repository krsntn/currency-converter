import { useState, useEffect } from "react";
import "./App.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Numpad from "./components/Numpad";

const App = () => {
  const [isRateFocused, setIsRateFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState(0);
  const [rate, setRate] = useState(2);

  useEffect(() => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);

    const localRate = localStorage.getItem("rate");
    if (localRate) setRate(localRate);
  }, []);

  const inputValueChanged = (value) => {
    setInputValue(value);
    if (value.slice(-1).match(/\d/)) {
      try {
        const result = eval(value);
        if (typeof result === "number") {
          setOutput(result);
        }
      } catch (e) {
        console.error("Eval error", e);
      }
    } else if (value.length === 0) {
      setOutput(0);
    }
  };

  const rateChanged = (value) => {
    localStorage.setItem("rate", value);
    setRate(value);
  };

  const formatterFC = Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  });

  return (
    <div className="p-4 m-auto min-h-[100dvh] w-full max-w-lg flex flex-col justify-between gap-4">
      <div>
        <div className="grid grid-cols-2 items-center gap-2 mb-8">
          <Label htmlFor="rate">Exchange Rate</Label>
          <Input
            id="rate"
            type="number"
            inputMode="decimal"
            value={rate}
            onFocus={(e) => {
              e.target.select();
              setIsRateFocused(true);
            }}
            onBlur={() => setIsRateFocused(false)}
            onChange={(e) => rateChanged(e.target.value)}
            className="text-center text-lg"
          />
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-2 items-center gap-2">
            {/[+\-*/]/.test(inputValue) ? (
              <>
                <div />
                <div className="text-xs">{inputValue}</div>
              </>
            ) : null}
            <Label htmlFor="fc">Foreign Currency</Label>
            <div className="text-center text-lg p-4">
              {formatterFC.format(output)}
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-4" />

          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="fc">To</Label>

            <div className="text-center text-lg p-4">
              {formatterFC.format(output * rate)}
            </div>
          </div>
        </div>
      </div>

      <Numpad
        onInputChange={inputValueChanged}
        hide={isRateFocused}
        onReverse={() => {
          const newRate = 1 / rate;
          rateChanged(newRate);
        }}
      />
    </div>
  );
};

export default App;
