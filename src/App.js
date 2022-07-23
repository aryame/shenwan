import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/login'
import UserInfo from './pages/userInfo'
import Operation from './pages/operation'

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const userName = localStorage.getItem('userName')
    const active = localStorage.getItem('active')
    if (active) {
      if (userName === 'admin') {
        navigate('/userInfo')
      } else {
        navigate('/operation')
      }
    } else {
      navigate('/login')
    }
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/operation" element={<Operation />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
