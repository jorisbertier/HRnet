import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import EmployeeList from './pages/EmployeeList';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employeeList" element={<EmployeeList />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
