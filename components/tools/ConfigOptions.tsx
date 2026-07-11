import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface ConfigOptionsProps {
  length: number;
  setLength: (len: number) => void;
  includeUppercase: boolean;
  setIncludeUppercase: (val: boolean) => void;
  includeLowercase: boolean;
  setIncludeLowercase: (val: boolean) => void;
  includeNumbers: boolean;
  setIncludeNumbers: (val: boolean) => void;
  includeSymbols: boolean;
  setIncludeSymbols: (val: boolean) => void;
  onGenerate: () => void;
}

export default function ConfigOptions({
  length,
  setLength,
  includeUppercase,
  setIncludeUppercase,
  includeLowercase,
  setIncludeLowercase,
  includeNumbers,
  setIncludeNumbers,
  includeSymbols,
  setIncludeSymbols,
  onGenerate,
}: ConfigOptionsProps) {
  
  // Local string state allows free typing (e.g., typing '1' before '2' for '12')
  const [localInput, setLocalInput] = useState(length.toString());

  // Keep the input box synced if the user drags the slider instead
  useEffect(() => {
    setLocalInput(length.toString());
  }, [length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalInput(val); // Let the user type whatever they want temporarily

    const num = parseInt(val, 10);
    // Push to the main app only if it's a valid number between 0 and 64
    if (!isNaN(num) && num >= 0 && num <= 64) {
      setLength(num);
    }
  };

  // Clean up the input when the user clicks away (onBlur)
  const handleInputBlur = () => {
    let num = parseInt(localInput, 10);
    // If they left it blank, typed letters, or went under 6, snap it safely to 6
    if (isNaN(num) || num < 6) num = 6;
    // If they pasted a massive number, snap it to 64
    if (num > 64) num = 64;
    
    setLocalInput(num.toString());
    setLength(num);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputBlur(); // Ensure the typed number is saved first
      onGenerate();      // Generate the password
    }
  };

  return (
    <div className="space-y-6 text-gray-900">
      {/* Adjustable Length Parameters */}
      {/* Adjustable Length Parameters */}
      {/* Adjustable Length Parameters */}
      <div>
        <div className="mb-3 flex items-center justify-between text-sm font-bold sm:text-base">
          <label htmlFor="length-range">Character Length</label>
          <input
            id="length-number"
            type="text"
            value={localInput}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="w-16 font-mono bg-slate-900 text-white text-center px-2 py-0.5 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-600">6</span>
          <input
            id="length-range"
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#064ACB]"
          />
          <span className="text-xs font-bold text-slate-600">64</span>
        </div>
      </div>
      
      {/* Checkbox Parameters Structure */}
      <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
        <label className="flex items-center gap-3 font-semibold text-sm sm:text-base cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            className="h-5 w-5 rounded border-slate-700 bg-slate-900 text-[#064ACB] accent-[#064ACB]"
          />
          Uppercase Characters (A-Z)
        </label>

        <label className="flex items-center gap-3 font-semibold text-sm sm:text-base cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
            className="h-5 w-5 rounded border-slate-700 bg-slate-900 text-[#064ACB] accent-[#064ACB]"
          />
          Lowercase Characters (a-z)
        </label>

        <label className="flex items-center gap-3 font-semibold text-sm sm:text-base cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="h-5 w-5 rounded border-slate-700 bg-slate-900 text-[#064ACB] accent-[#064ACB]"
          />
          Numerical Digits (0-9)
        </label>

        <label className="flex items-center gap-3 font-semibold text-sm sm:text-base cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="h-5 w-5 rounded border-slate-700 bg-slate-900 text-[#064ACB] accent-[#064ACB]"
          />
          Special Symbols (!@#$)
        </label>
      </div>

      {/* Execution Action Bar */}
      <div className="pt-4">
        <button
          onClick={onGenerate}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#064ACB] py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-[#366ED8] active:scale-98"
        >
          Generate Password
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}