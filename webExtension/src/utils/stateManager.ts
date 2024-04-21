import { useState } from "react";
import { generateMessage } from "./generatePrompt"; // Importar la función de utilidades si es necesario

export const useAppState = () => {
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
    const message = generateMessage(prompt, selectedFlow); // Si estás utilizando la función de utilidades

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

  return {
    selectedOption,
    selectedFlow,
    prompt,
    handleOptionChange,
    handleFlowChange,
    handlePromptChange,
    handleSubmit,
  };
};
