import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import Items from './pages/Items';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="events"
              element={
                <ProtectedRoute allowedUserTypes={['ORGANIZATION', 'ADMIN']}>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route
              path="items"
              element={
                <ProtectedRoute allowedUserTypes={['VENDOR', 'ADMIN']}>
                  <Items />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
