import React, { lazy, Suspense } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from './features/Form'
import DotLoader from 'react-spinners/DotLoader'
const LazyTable = lazy(() => import('./features/Table'))

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Form/>}/>
          <Route path='/table' element={<Suspense fallback={<DotLoader color='rgb(0, 255, 200)'/>}>
            <LazyTable/>
          </Suspense>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
