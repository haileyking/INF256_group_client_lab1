import { useEffect, useState } from "react";

type Evaluation = {
  value1: number;
  value2: number;
  operation: string;
};

function History() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/math/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setEvaluations(data.data);
        }
      })
      .catch(() => {
        setError("Could not load evaluations.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>History</h2>

      {evaluations.length === 0 ? (
        <p>No evaluations found.</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Value 1</th>
              <th>Operation</th>
              <th>Value 2</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((item, index) => (
              <tr key={index}>
                <td>{item.value1}</td>
                <td>{item.operation}</td>
                <td>{item.value2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;