import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [Password, setPassword] = useState("");
  const [numbersallowed, setNumbersallowed] = useState(false);
  const [charsallowed, setCharsallowed] = useState(false);

  const passwordRef = useRef(null);

  const copytoClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
    alert("Copied to Clipboard! \u{1F973} \u{1F389}");
  };

  const generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (numbersallowed) str += "0123456789";
    if (charsallowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersallowed, charsallowed, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, numbersallowed, charsallowed, generatePassword]);

  return (
    <>
      <h1 className="text-white text-center text-5xl mt-40 title-text">
        Password Generator
      </h1>
      <div className="flex justify-center items-center mt-32 w-auto">
        <div
          className="px-3 py-4 rounded content"
          style={{ backgroundColor: "#1C2432" }}
        >
          <div className="flex justify-center  gap-5">
            <input
              className="w-auto outline-none rounded px-4 text-2xl"
              type="text"
              value={Password}
              ref={passwordRef}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded"
              onClick={() => {
                copytoClipboard();
              }}
            >
              Copy
            </button>
          </div>
          <br />
          <div className="flex  justify-center gap-2 text-white content-parameters">
            <div className="flex gap-x-1">
              <input
                type="range"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                value={length}
                min={6}
                max={20}
              />
              <label>Length({length})</label>
            </div>
            <div className="flex gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numbersallowed}
                onChange={() => {
                  setNumbersallowed((prev) => !prev);
                }}
              />
              <label>Numbers</label>
            </div>
            <div className="flex gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charsallowed}
                onChange={() => {
                  setCharsallowed((prev) => !prev);
                }}
              />
              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
