import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(null);

  function onClick() {
    fetch("/api/count", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => response.count)
      .then(setCount);
  }

  return (
    <div className="App">
      {count && <p>You clicked me {count} times.</p>}
      <button onClick={onClick}>Click Me!</button>
    </div>
  )
}
