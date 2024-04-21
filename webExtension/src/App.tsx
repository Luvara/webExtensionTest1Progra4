import React, { useState } from "react";
import OptionSelector from "./components/EngineSelectorComponent";
import FlowSelector from "./components/FlowSelectorComponent";
import TextInput from "./components/TextInputComponent";
import SubmitButton from "./components/SubmitButtonComponent";

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
    let messageSend = "";

    if (selectedFlow === "flujo1") {
      messageSend =
        "Por favor, analiza detalladamente el siguiente código de programación: " +
        prompt +
        //" sigue estos pasos: Revisa el código en busca de posibles errores de sintaxis, lógica o rendimiento. Identifica cualquier posible mejora en la eficiencia o legibilidad del código. Proporciona una solución detallada para corregir cualquier error que encuentres. Si no se encuentran errores, describe de manera precisa y concisa qué hace el código y cómo funciona. Por favor, asegúrate de ser específico y puntual en tus comentarios y sugerencias. Gracias por tu ayuda.";
        " sigue estos pasos: Revisa el código en busca errores. Identifica posibles mejoras en el código. Proporciona una solución para corregir cualquier error. Si no se encuentran errores, describe el código y su funcion.";
    } else {
      messageSend =
        "Por favor, analiza detalladamente el siguiente código de programación: " +
        prompt +
        //" sigue estos pasos: Realiza un análisis detallado del código proporcionado. Genera observaciones y sugerencias basadas en tu análisis. Implementa las sugerencias propuestas y prueba el código corregido. Documenta tus observaciones y soluciones implementadas. Proporciona retroalimentación sobre el proceso de revisión y corrección.";
        " sigue estos pasos: Realiza un análisis detallado del código. Genera observaciones y sugerencias. Implementa las sugerencias y prueba el código. Documenta tus observaciones y soluciones. Proporciona retroalimentación sobre el proceso.";
    }

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
            if (messageSend && typeof newTab.id === "number") {
              chrome.tabs.sendMessage(
                newTab.id,
                { prompt: messageSend },
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
