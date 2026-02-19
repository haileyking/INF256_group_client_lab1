import { useState } from "react";

function App() {
  const [value1, setValue1] = useState<number | "">("");
  const [value2, setValue2] = useState<number | "">("");
  const [answer, setAnswer] = useState<string>("");

  const calculate = (operation: string) => {
    if (value1 === "" || value2 === "") {
      return;
    }

    let result: number = 0;

    switch (operation) {
      case "+":
        result = value1 + value2;
        break;
      case "-":
        result = value1 - value2;
        break;
      case "*":
        result = value1 * value2;
        break;
      case "/":
        if (value2 === 0) return;
        result = value1 / value2;
        break;
    }

    setAnswer(`${value1} ${operation} ${value2} = ${result}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Math Evaluator</h1>

      <input
        type="number"
        value={value1}
        onChange={(e) =>
          setValue1(e.target.value === "" ? "" : Number(e.target.value))
        }
      />

      <input
        type="number"
        value={value2}
        onChange={(e) =>
          setValue2(e.target.value === "" ? "" : Number(e.target.value))
        }
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => calculate("+")}>Add</button>
        <button onClick={() => calculate("-")}>Subtract</button>
        <button onClick={() => calculate("*")}>Multiply</button>
        <button onClick={() => calculate("/")}>Divide</button>
      </div>

      <h2 style={{ marginTop: "20px" }}>{answer}</h2>
    </div>
  );
}

export default App;
