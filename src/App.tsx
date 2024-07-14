import Button from "./Button";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
      <h1>웃꾜 ... </h1>
      <Routes>
        <Route path="/btn/:id" element={<Button />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
