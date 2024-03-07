import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import Order from './views/Order';
import NotFound from './views/NotFound';
import Login from './views/Login';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
       <Route path="/" element={<Login/>}/>
       <Route path="/home" element={<Home/>}/>
       <Route path="/order" element={<Order/>}/>
       <Route path="*" element={<NotFound/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
