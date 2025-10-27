import { BrowserRouter as Router, Routes, Route } from "react-router-dom" ;
import FlightResultPage from './pages/FlightResultPage'
import AdminDashboard from "./pages/AdminDashboard";
import AgentList from "./pages/AgentList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightResultPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/agentlist" element={<AgentList />} />
      </Routes>
    </Router>
  )
}

export default App
