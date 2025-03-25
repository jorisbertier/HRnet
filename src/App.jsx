// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Form from './components/Form/Form';
import Home from './pages/Home'
import EmployeeList from './pages/EmployeeList';

function App() {
  // const [count, setCount] = useState(0)

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
