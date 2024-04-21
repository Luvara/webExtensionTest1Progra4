import React from "react";

interface OptionSelectorProps {
  selectedOption: string;
  handleOptionChange: (option: string) => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  selectedOption,
  handleOptionChange,
}) => {
  return (
    <div className="flex text-center">
      <input
        type="radio"
        id="option1"
        name="options"
        value="option1"
        className="sr-only"
        checked={selectedOption === "option1"}
        onChange={() => handleOptionChange("option1")}
      />
      <label
        htmlFor="option1"
        className={`px-4 py-2 rounded-lg w-1/2 mr-1 hover:cursor-pointer ${
          selectedOption === "option1"
            ? "bg-lime-500 text-black font-bold"
            : "border-0 bg-gray-200 opacity-50"
        }`}
      >
        Gemini
      </label>

      <input
        type="radio"
        id="option2"
        name="options"
        value="option2"
        className="sr-only"
        checked={selectedOption === "option2"}
        onChange={() => handleOptionChange("option2")}
      />
      <label
        htmlFor="option2"
        className={`px-4 py-2 rounded-lg w-1/2 ml-1 hover:cursor-pointer ${
          selectedOption === "option2"
            ? "bg-lime-500 text-black font-bold"
            : "border-0 bg-gray-200 opacity-50"
        }`}
      >
        ChatGPT
      </label>
    </div>
  );
};

export default OptionSelector;
