// import logo from './logo.svg';
import './App.css';
import'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomeComponents from './components/HomeComponent';
import LoginComponent from './components/loginController';
import NotAuthorized from './components/NotAuthorized';
import NotFound from './components/NotFoundController';
import RegisterComponent from './components/RegisterComponent';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoutes from './context/ProtectedRoutes';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLayout from './components/Admin/AdminLayout';



function App() {
  return (
    <Router>
      {/* we wrap all routes inside the AuthProvider */}
      <AuthProvider>

      <Routes>
        <Route path="/" element={<HomeComponents/>} />

        {/* Admin protected routes */}
        <Route path='admin-dashboard' element={<ProtectedRoutes allowedRoles={['admin']}>
          <AdminLayout/>
        </ProtectedRoutes>}>

        <Route path='' element={<AdminDashboard/>} />
        </Route>

        <Route path='/register' element={<RegisterComponent/>}/>
        <Route path='/login' element={<LoginComponent/>}/>
        {/* default routes */}
        <Route path='/not-authorized' element={<NotAuthorized/>}/>
        <Route path='*' element={<NotFound/>} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;