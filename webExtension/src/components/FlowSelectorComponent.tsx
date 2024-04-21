import React from "react";

interface FlowSelectorProps {
  selectedFlow: string;
  handleFlowChange: (flow: string) => void;
}

const FlowSelector: React.FC<FlowSelectorProps> = ({
  selectedFlow,
  handleFlowChange,
}) => {
  return (
    <div className="flex flex-row items-center justify-center font-bold text-lg">
      <label className="mr-1">
        <input
          className="mr-1"
          type="radio"
          value="flujo1"
          checked={selectedFlow === "flujo1"}
          onChange={() => handleFlowChange("flujo1")}
        />
        Flujo Reflexivo
      </label>
      <label className="ml-1">
        <input
          className="mr-1"
          type="radio"
          value="flujo2"
          checked={selectedFlow === "flujo2"}
          onChange={() => handleFlowChange("flujo2")}
        />
        Flujo Multiagente
      </label>
    </div>
  );
};

export default FlowSelector;
