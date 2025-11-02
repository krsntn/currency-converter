import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Numpad = ({ onInputChange, hide, onReverse }) => {
  const [input, setInput] = useState("");

  const handleButtonClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "<") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === ".") {
      if (input.length !== 0 && !input.includes(".")) {
        setInput((prev) => prev.concat("."));
      }
    } else if (value === "↕") {
      onReverse();
    } else if (value === "+" || value === "-") {
      const lastChar = input.slice(-1);
      if (lastChar.match(/\d/)) {
        setInput((prev) => prev.concat(value));
      } else if (lastChar !== value) {
        setInput((prev) => prev.slice(0, -1).concat(value));
      }
    } else {
      setInput((prev) => prev.concat(value));
    }
  };

  useEffect(() => {
    onInputChange(input);
  }, [input, onInputChange]);

  const buttons = [
    "7",
    "8",
    "9",
    "<",
    "4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "-",
    "C",
    "0",
    ".",
    "↕",
  ];

  return (
    <div
      className={`p-4 mx-auto rounded-lg w-full ${hide ? "hidden" : "block"}`}
    >
      <div className="grid grid-cols-4 gap-4">
        {buttons.map((button) => {
          return (
            <Button
              key={button}
              variant="link"
              onClick={() => handleButtonClick(button)}
              className="h-14"
            >
              {button}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Numpad;
