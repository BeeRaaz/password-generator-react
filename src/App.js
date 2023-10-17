import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState ("");
  
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str+="0123456789";
    if (charAllowed) str+="!@#$%^&*{}[]";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed,setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <h1 className="text-center text-white text-5xl">Password Generator</h1>
      <div className="bg-white w-1/3 mx-auto my-10 py-3 px-5 rounded-3xl">
        <div className="flex">
          <input type="text" value={password} placeholder="PassWord" className="bg-gray-200 w-4/5 py-3 px-2 outline-none rounded-md" ref={passwordRef}></input>
          <button className="bg-blue-300 w-1/4 text-2xl rounded-lg" onClick={copyPasswordToClipboard}>COPY</button>
        </div>
        <div className="flex mt-8 gap-12 text-2xl">
          <div className="flex">
            <input type="range" min={8} max={15} value={length} id="lengthInput" className="cursor-pointer" onChange={(e) => {setLength(e.target.value)}}></input>
            <label htmlFor="lengthInput" className="ml-2">Length:{length}</label>      
          </div>
          <div className="flex">
            <input type="checkbox" id="numberAllowedInput" defaultChecked={numberAllowed} className="cursor-pointer" onChange={() => {setNumberAllowed((prev) => !prev)}}></input>
            <label htmlFor="numberAllowedInput"  className="ml-2">Numbers</label>
          </div>
          <div className="flex">
            <input type="checkbox" id="charAllowedInput" defaultChecked={charAllowed} className="cursor-pointer" onChange={() => {setCharAllowed((prev) => !prev)}}></input>
            <label htmlFor="charAllowedInput"  className="ml-2">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
