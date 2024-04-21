import React from "react";

interface TextInputProps {
  prompt: string;
  onPromptChange: (newPrompt: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ prompt, onPromptChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onPromptChange(event.target.value);
  };

  return (
    <textarea
      className="p-5 border-2 bg-slate-300 border-black rounded-lg text-base"
      id="texto"
      name="texto"
      rows={10}
      cols={75}
      required
      value={prompt}
      onChange={handleChange}
      placeholder="Ingresa tu código aquí"
    ></textarea>
  );
};

export default TextInput;
