import React from "react";

interface SubmitButtonProps {
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => {
  return (
    <button className="w-1/3 font-bold text-lg" onClick={onClick}>
      Enviar
    </button>
  );
};

export default SubmitButton;
