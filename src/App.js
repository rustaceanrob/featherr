import './App.css';
import Login from './components/Login';
import Terms from './components/Terms';
import MainView from './components/MainView';
import MathGuide from './components/MathGuide';
import LatexTable from './components/LatexTable';
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
          <Route path='/terms' element={<Terms/>}/>
          <Route path='/mathguide' element={<MathGuide/>}/>
          <Route path='/latextable' element={<LatexTable/>}/>
        </Routes>
    </AuthContextProvider>
  );
}

export default App;
