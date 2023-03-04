import './App.css';
import Login from './components/Login';
import MainView from './components/MainView';
import ProtectedRoute from './components/utility/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthContextProvider>
        <Routes>
          <Route path='/' element={ 
            <ProtectedRoute>
              <MainView/>
            </ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </AuthContextProvider>
  );
}

export default App;
