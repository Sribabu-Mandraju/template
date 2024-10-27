import React from 'react'
import './App.css'
import './index.css'
import FlowDiagram from './components/Box'
import DraggableBoxes from './components/Box'
import ProfileCard from './components/cards/Profile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import DraggableBoxes2 from './components/Box3'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define your route paths */}
          <Route path="/" element={<DraggableBoxes />} />
          <Route path="/box" element={<DraggableBoxes2 />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {/* You can add more routes as per your app's structure */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
