import React from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import {Home} from './pages/Home.jsx';
import {Recipe} from './pages/Recipe.jsx';
import {MealPlanner} from './pages/MealPlanner.jsx';
import {Profile} from './pages/Profile.jsx';
import Navbar from './components/Navbar.jsx'; 

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Recipe />
        <MealPlanner />
        <Profile />
        <div className="App">
          <Routes>
            <Route  path='/' element={<Home />}/>
            <Route  path='/Recipe' element={<Recipe />}/>
            <Route  path='/MealPlanner' element={<MealPlanner />}/>
            <Route  path='/Profile' element={<Profile />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
