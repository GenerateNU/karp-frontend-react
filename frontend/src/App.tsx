import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Sierra from './pages/Sierra';
import Home from './pages/Home';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="sierra" element={<Sierra />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
