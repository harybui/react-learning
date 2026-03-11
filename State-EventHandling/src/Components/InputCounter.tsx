import { useState } from "react";
import { Button, Input } from "antd";
const InputCounter = () => {
  const [value, setValue] = useState("");
  const [numbers, setNumbers] = useState<number[]>([]);
  const addNumber = () => {
    setNumbers([...numbers, Number(value)]);
    setValue("");
  };
  const total = numbers.reduce((sum, n) => sum + n, 0);
  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={addNumber}>Add</Button>
      <ul>
        {numbers.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
      <h3>Total: {total}</h3>
    </div>
  );
};

export default InputCounter;
