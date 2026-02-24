import { useState } from "react";
import History from "./components/History";

function App() {
  const [value1, setValue1] = useState<number | "">("");
  const [value2, setValue2] = useState<number | "">("");
  const [answer, setAnswer] = useState<string>("");
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const calculate = async (operation: string) => {
    if (value1 === "" || value2 === "") return;

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

    // Send to server
    await fetch("http://localhost:3000/math/evaluation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value1,
        value2,
        operation,
      }),
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Math Evaluator</h1>

      <button onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "Back to Calculator" : "View History"}
      </button>

      {showHistory ? (
        <History />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;
