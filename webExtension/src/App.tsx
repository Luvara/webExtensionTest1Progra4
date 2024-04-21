import React, { useState } from "react";
import OptionSelector from "./components/EngineSelectorComponent";
import FlowSelector from "./components/FlowSelectorComponent";
import TextInput from "./components/TextInputComponent";
import SubmitButton from "./components/SubmitButtonComponent";
import { generateMessage } from "./utils/generatePrompt";

const App: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedFlow, setSelectedFlow] = useState("flujo1");
  const [prompt, setPrompt] = useState("");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleFlowChange = (flow: string) => {
    setSelectedFlow(flow);
  };

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  const handleSubmit = () => {
    const message = generateMessage(prompt, selectedFlow);

    const url =
      selectedOption === "option1"
        ? "https://gemini.google.com/app"
        : "https://chat.openai.com/";

    chrome.tabs.create({ url: url, active: false }, (newTab) => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      } else {
        const listener = function (
          tabId: number,
          changeInfo: chrome.tabs.TabChangeInfo
        ) {
          if (tabId === newTab.id && changeInfo.status === "complete") {
            //chrome.tabs.update(newTab.id, { active: true });
            if (message && typeof newTab.id === "number") {
              chrome.tabs.sendMessage(
                newTab.id,
                { prompt: message },
                (response) => {
                  if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError.message);
                  } else {
                    console.log(response);
                  }
                }
              );
            } else {
              console.log("No prompt provided");
            }
            chrome.tabs.onUpdated.removeListener(listener);
          }
        };
        chrome.tabs.onUpdated.addListener(listener);
      }
    });
    console.log(
      "Enviar formulario con los datos:",
      selectedOption,
      selectedFlow,
      prompt
    );
  };

  return (
    <div className="bg-gray-400 rounded-3xl font-mono text-base text-black">
      <div className="p-5 space-y-3 flex-col">
        <h1 className="text-xl">My Extension</h1>
        <OptionSelector
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
        <TextInput prompt={prompt} onPromptChange={handlePromptChange} />
        <FlowSelector
          selectedFlow={selectedFlow}
          handleFlowChange={handleFlowChange}
        />
        <div className="grid justify-items-center">
          <SubmitButton onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default App;
