import React from "react";
import OptionSelector from "./components/EngineSelectorComponent";
import FlowSelector from "./components/FlowSelectorComponent";
import TextInput from "./components/TextInputComponent";
import SubmitButton from "./components/SubmitButtonComponent";
import { useAppState } from "./utils/stateManager";

const App: React.FC = () => {
  const {
    selectedOption,
    selectedFlow,
    prompt,
    handleOptionChange,
    handleFlowChange,
    handlePromptChange,
    handleSubmit,
  } = useAppState();

  return (
    <div className="bg-gray-400 rounded-3xl font-mono text-base text-black ">
      <div className="p-5 space-y-3 flex-col items-center">
        <h1 className="text-xl">My First Extension</h1>
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
