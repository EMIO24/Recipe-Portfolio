import React from 'react';
import { Route, Routes } from 'react-router-dom'; // HashRouter as Router is removed
import './App.css';
import Home from './pages/Home.jsx';
import Recipe from './pages/Recipe.jsx';
import MealPlanner from './pages/MealPlanner.jsx';
import Profile from './pages/Profile.jsx';
import AddEditRecipePage from './pages/AddEditRecipePage.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import ShoppingList from './pages/ShoppingList.jsx';
import NotFound from './pages/NotFound.jsx';
import Footer from './components/Footer.jsx';
import PlannedMeal from './pages/PlannedMeal.jsx';
import SavedRecipes from './pages/SavedRecipes.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import PlannerContextProvider from './context/PlannerContext.jsx';
import ToastProvider from './context/ToastContext.jsx';

export default function App() {
  return (
    // The outermost <Router> component has been removed here.
    // The app now relies on the single <HashRouter> wrapper provided in main.jsx.
    <ProfileProvider>
      <PlannerContextProvider>
        <ToastProvider>
          <div className="page-container">
            <div className="App">
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
  );
}
