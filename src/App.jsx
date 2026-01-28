import { Routes, Route } from "react-router-dom";
import Create from "./pages/create";
import View from "./pages/View";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Create />} />
      <Route path="/view" element={<View />} />
    </Routes>
  );
}

export default App;
