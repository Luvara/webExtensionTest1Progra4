import { useState } from "react";
import { generateMessage } from "./generatePrompt";

export const useAppState = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedFlow, setSelectedFlow] = useState("flujo1");
  const [prompt, setPrompt] = useState("");
  const [sending, setSending] = useState(false);

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
    if (prompt && prompt.trim() !== "") {
      setSending(true);
      setTimeout(() => {
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
                chrome.tabs.update(newTab.id, { active: true });
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
      }, 3500);
    } else {
      alert("Por favor, ingrese texto en el campo de texto");
      console.log("No prompt provided");
    }
  };

  return {
    selectedOption,
    selectedFlow,
    prompt,
    sending,
    handleOptionChange,
    handleFlowChange,
    handlePromptChange,
    handleSubmit,
  };
};
