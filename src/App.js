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
import Classes from './components/Admin/Classes';
import Teacher from './components/Admin/Teacher';
import Student from './components/Admin/Student';
import Parent from './components/Admin/Parent';
import ClassAdd from './components/Admin/Forms/ClassAdd';
import ClassEdit from './components/Admin/Forms/ClassEdit';
import AddTeacher from './components/Admin/Forms/TeacherAdd';
import EditTeacher from './components/Admin/Forms/TeacherEdit';
import ParentEdit from './components/Admin/Forms/ParentEdit';
import ParentAdd from './components/Admin/Forms/ParentAdd';
import StudentAdd from './components/Admin/Forms/StudentAdd';
import StudentEdit from './components/Admin/Forms/StudentEdit';

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

        <Route path='classes' element={<Classes/>} />
        <Route path='classes/add' element={<ClassAdd/>} />
        <Route path='classes/edit' element={<ClassEdit/>} />

        <Route path='teachers' element={<Teacher/>} />
        <Route path='teachers/add' element={<AddTeacher/>} />
        <Route path='teachers/edit' element={<EditTeacher/>} />
        

        <Route path='students' element={<Student/>} />
        <Route path='students/add' element={<StudentAdd/>} />
        <Route path='students/edit' element={<StudentEdit/>} />

        <Route path='parents' element={<Parent/>} />
        <Route path='parents/edit' element={<ParentEdit/>} />
        <Route path='parents/add' element={<ParentAdd/>} />
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