import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import Recipe from './pages/Recipe.jsx';
import MealPlanner from './pages/MealPlanner.jsx';
import Profile from './pages/Profile.jsx';
import AddEditRecipePage from './pages/AddEditRecipePage.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import ShoppingList from './pages/ShoppingList.jsx';
import NotFound from './pages/NotFound.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import PlannedMeal from './pages/PlannedMeal.jsx';
import SavedRecipes from './pages/SavedRecipes.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import PlannerContextProvider from './context/PlannerContext.jsx';
import ToastProvider from './context/ToastContext.jsx';

export default function App() {
  return (
    <Router>
      <ProfileProvider>
        <PlannerContextProvider>
          <ToastProvider>
          <div className="page-container">
            <div className="App">
              <Navbar />
              <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipe />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
                <Route path="/planned/:id" element={<PlannedMeal />} />
                <Route path="/saved" element={<SavedRecipes />} />
                <Route path="/add" element={<AddEditRecipePage />} />
                <Route path="/add/:id" element={<AddEditRecipePage />} />
                <Route path="/planner" element={<MealPlanner />} />
                <Route path="/shopping" element={<ShoppingList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
              <Footer />
            </div>
          </div>
          </ToastProvider>
        </PlannerContextProvider>
      </ProfileProvider>
    </Router>
  );
}
