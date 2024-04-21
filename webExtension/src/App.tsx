import "./App.css";
import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState<string | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedFlow, setSelectedFlow] = useState("flujo1");

  const onClick = async () => {
    let messageSend = ""; // Inicialmente, conservamos el prompt actual

    // Verificar el flujo seleccionado y actualizar el prompt si es necesario
    if (selectedFlow === "flujo1") {
      messageSend =
        "Por favor, analiza detalladamente el siguiente código de programación: " +
        prompt +
        //" sigue estos pasos: Revisa el código en busca de posibles errores de sintaxis, lógica o rendimiento. Identifica cualquier posible mejora en la eficiencia o legibilidad del código. Proporciona una solución detallada para corregir cualquier error que encuentres. Si no se encuentran errores, describe de manera precisa y concisa qué hace el código y cómo funciona. Por favor, asegúrate de ser específico y puntual en tus comentarios y sugerencias. Gracias por tu ayuda.";
        " sigue estos pasos: Revisa el código en busca errores. Identifica posibles mejoras en el código. Proporciona una solución para corregir cualquier error. Si no se encuentran errores, describe el código y su funcion.";
    } else {
      messageSend =
        "Por favor, analiza detalladamente el siguiente código de programación: " +
        prompt;
      +(
        //" sigue estos pasos: Realiza un análisis detallado del código proporcionado. Genera observaciones y sugerencias basadas en tu análisis. Implementa las sugerencias propuestas y prueba el código corregido. Documenta tus observaciones y soluciones implementadas. Proporciona retroalimentación sobre el proceso de revisión y corrección.";
        " sigue estos pasos: Realiza un análisis detallado del código. Genera observaciones y sugerencias. Implementa las sugerencias y prueba el código. Documenta tus observaciones y soluciones. Proporciona retroalimentación sobre el proceso."
      );
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
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    console.log(option);
  };

  const handleOptionChangeFlow = (option: string) => {
    setSelectedFlow(option);
    console.log(option);
  };

  return (
    <>
      <div className="bg-gray-400 rounded-3xl font-mono text-base text-black ">
        <div className="p-5 space-y-3 flex-col">
          <h1 className="text-xl">My Extension</h1>
          <div className="flex ">
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
                  ? "bg-blue-500 text-black  font-bold"
                  : "border-0 bg-gray-200 opacity-50"
              }`}
            >
              GEMINI
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
                  ? "bg-blue-500 text-black  font-bold"
                  : "border-0 bg-gray-200 opacity-50"
              }`}
            >
              ChatGPT
            </label>
          </div>

          <textarea
            className="p-5 border-2 bg-slate-300 border-black rounded-lg text-sm"
            id="texto"
            name="texto"
            rows={10}
            cols={75}
            required
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          ></textarea>
          <label className="mr-1">
            <input
              className="mr-1"
              type="radio"
              value="flujo1"
              checked={selectedFlow === "flujo1"}
              onChange={() => handleOptionChangeFlow("flujo1")}
            />
            Flujo Reflexivo
          </label>
          <label className="ml-1">
            <input
              className="mr-1"
              type="radio"
              value="flujo2"
              checked={selectedFlow === "flujo2"}
              onChange={() => handleOptionChangeFlow("flujo2")}
            />
            Flujo Multiagente
          </label>
          <div className="grid justify-items-center">
            <button className="w-1/3" onClick={onClick}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
