import './App.css'
import Dashboard from '../src/pages/Dashboard/Dashboard.jsx'
import Login from '../src/pages/Login/Login.jsx'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
      <div>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </div>
    
  );
}

export default App;
