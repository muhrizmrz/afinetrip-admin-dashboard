import { BrowserRouter as Router, Routes, Route } from "react-router-dom" ;
import FlightResultPage from "./pages/FlightResultPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightResultPage />} />
      </Routes>
    </Router>
  )
}

export default App
