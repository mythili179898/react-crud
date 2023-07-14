import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from './Login';
// import Home from './Home';
// import Register from './Register';
import { ToastContainer } from 'react-toastify';
import { Suspense, lazy } from 'react';

// Implements lazy loading 
const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const AddCart = lazy(() => import('./AddCart'));
const LoadingFallback = () => {
  <div>Loading...</div>
}
function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored'></ToastContainer>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/register' element={<Register />} ></Route>
        </Routes>
      </BrowserRouter> */}


      {/* Lazy loading with React Router */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Suspense fallback={<LoadingFallback />}><Home /></Suspense>} />
          <Route path="/login" element={<Suspense fallback={<LoadingFallback />}><Login /></Suspense>} />
          <Route path="/register" element={<Suspense fallback={<LoadingFallback />}><Register /></Suspense>} />
          <Route path="/addCart" element={<Suspense fallback={<LoadingFallback />}><AddCart /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
