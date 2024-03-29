import './App.css';
import Login from './components/Login';
import Terms from './components/Terms';
import MainView from './components/MainView';
import MathGuide from './components/MathGuide';
import LatexTable from './components/LatexTable';
import Landing from './components/Landing';
import ProtectedRoute from './components/utility/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import PrivatePolicy from './components/PrivatePolicy';


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
          <Route path='/privatepolicy' element={<PrivatePolicy/>}/>
          <Route path='/mathguide' element={<MathGuide/>}/>
          <Route path='/latextable' element={<LatexTable/>}/>
          <Route path='/landing' element={<Landing/>}/>
        </Routes>
    </AuthContextProvider>
  );
}

export default App;
