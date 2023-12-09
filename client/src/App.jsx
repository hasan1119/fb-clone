import { useEffect } from "react";

function App() {
  const getRes = async () => {
    const res = await fetch("http://localhost:8000");
    console.log(res);
  };

  useEffect(() => {
    getRes();
  }, []);

  return <div>Hello from client</div>;
}

export default App;
