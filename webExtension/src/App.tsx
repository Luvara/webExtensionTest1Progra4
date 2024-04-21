import React from "react";
import OptionSelector from "./components/EngineSelectorComponent";
import FlowSelector from "./components/FlowSelectorComponent";
import TextInput from "./components/TextInputComponent";
import SubmitButton from "./components/SubmitButtonComponent";
import { useAppState } from "./utils/stateManager";
import Skelleton from "./utils/ExtensionSkeletonComponent";

const App: React.FC = () => {
  const {
    selectedOption,
    selectedFlow,
    prompt,
    sending,
    handleOptionChange,
    handleFlowChange,
    handlePromptChange,
    handleSubmit,
  } = useAppState();

  return (
    <>
      {sending && <Skelleton />}
      {!sending && (
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl font-mono text-base text-black ">
          <div className="p-5 space-y-3 flex-col items-center">
            {!sending && (
              <h1 className="text-xl text-center">My First Extension</h1>
            )}
            {!sending && (
              <OptionSelector
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
              />
            )}
            {!sending && (
              <TextInput prompt={prompt} onPromptChange={handlePromptChange} />
            )}
            {!sending && (
              <FlowSelector
                selectedFlow={selectedFlow}
                handleFlowChange={handleFlowChange}
              />
            )}
            {!sending && (
              <div className="grid justify-items-center">
                <SubmitButton onClick={handleSubmit} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
