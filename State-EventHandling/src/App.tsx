
import ToggleSwitch from "./Components/ToggleSwitch";
import "./App.css";
import InputCounter from "./Components/InputCounter";
import { useState } from "react";
import Counter from "./Components/Counter";
function App() {
  const [countA, setCountA]= useState(0)
  const [countB, setCountB]=useState(0)
  return (
    <div>
      {/* <ToggleSwitch />
      <InputCounter /> */}
      <Counter 
      value={countA}
      onIncrease={()=>setCountA(countA+1)}
      />
      <Counter
      value={countB}
      onIncrease={()=>setCountB(countB+1)}
      />
      <h3>Total: {countA+countB}</h3>
    </div>
    
  );
}

export default App;
