// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { StatsCard } from "../components/StatsCard";
import MealCard from "../components/MealCard";
import { usePlanner } from "../context/PlannerContext";
import useRecipes from "../hooks/useRecipes";
import SearchBar from "../components/SearchBar"; // <-- default import (no braces)
import "../styles/components.css";

export function Home() {
  const { plans } = usePlanner();
  const { listRecipes } = useRecipes();
  const [recipes, setRecipes] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;
    listRecipes().then(list => {
      if (mounted) setRecipes(list || []);
    });
    return () => (mounted = false);
  }, [listRecipes]);

  // --------- handleSearch: invoked by SearchBar (parent handles API) ----------
  const handleSearch = React.useCallback(async (query) => {
    // Example: replace with your API endpoint + key
    // NOTE: many public recipe APIs require an API key and have CORS rules.
    const API_URL = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
      query
    )}&number=12&apiKey=YOUR_API_KEY`;

    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data = await res.json();
      // Adjust according to API response shape:
      // Spoonacular returns { results: [...] } for complexSearch
      const results = data.results || data.items || [];
      setSearchResults(results);
      // Optionally update saved recipes state too:
      // setRecipes(results);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    }
  }, []);

  // ---------- stats and featured (unchanged) ----------
  const stats = [
    { title: "Planned Meals", description: `${plans?.length || 0} meals this week`, to: "/planner" },
    { title: "Saved Recipes", description: `${recipes?.length || 0} recipes`, to: "/saved" },
    { title: "Shopping List", description: "View items", to: "/shopping" },
  ];

  const syntheticMeals = [
    { id: "breakfast", name: "Breakfast", description: "Avocado Toast with Eggs", calories: 450 },
    { id: "lunch", name: "Lunch", description: "Grilled Chicken Salad", calories: 550 },
    { id: "dinner", name: "Dinner", description: "Salmon with Roasted Vegetables", calories: 650 },
  ];

  const featured = (recipes.slice(0, 3).map(r => ({
    id: r.id,
    title: r.title || r.name,
    summary: r.description || r.summary || "",
    calories: r.calories || 0,
  })) ).length ? recipes.slice(0,3).map(r => ({
    id: r.id,
    title: r.title || r.name,
    summary: r.description || r.summary || "",
    calories: r.calories || 0,
  })) : [
    { id: 1, title: "Spaghetti Bolognese", summary: "Classic family favorite", calories: 800 },
    { id: 2, title: "Chicken Caesar Salad", summary: "Light & fresh", calories: 400 },
    { id: 3, title: "Vegetable Stir Fry", summary: "Quick weeknight dinner", calories: 350 },
  ];

  // Today's meals handling (unchanged)
  const todayPlans = (plans || []).filter(p => {
    if (!p?.date) return false;
    const d = new Date(p.date);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  });

  const todayMealsElements = todayPlans.slice(0,3).map((p) => (
    <Link key={p.id} className="recipe-link" to={`/planned/${p.id}`}>
      <MealCard name={p.name} description={p.description} calories={p.calories} />
    </Link>
  ));

  const fallbackMealsElements = syntheticMeals.map((meal) => {
    const content = (
      <MealCard key={meal.id} name={meal.name} description={meal.description} calories={meal.calories} />
    );

    const recipeMatch = recipes.find(r => String(r.id) === String(meal.id));
    if (recipeMatch) {
      return (
        <Link key={meal.id} className="recipe-link" to={`/recipes/${recipeMatch.id}`}>
          {content}
        </Link>
      );
    }

    return (
      <Link key={meal.id} className="recipe-link" to={`/planner`}>
        {content}
      </Link>
    );
  });

  const mealsElements = todayMealsElements.length > 0 ? todayMealsElements : fallbackMealsElements;

  return (
    <div className="home-page">
      <header>
        <section className="home-hero">
          <Navbar />
          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">EMIO Meal Planner</h1>
              <p className="hero-subtitle">Your Personal Recipe Companion</p>
              <p className="hero-description">
                A centralized dashboard to view today's meals, access quick actions, 
                and discover your recent recipes—all in one place.
              </p>

              {/* SearchBar injected here */}
              <SearchBar onSearch={handleSearch} />
            </div>
          </section>
        </section>
      </header>

      <main>
        <section className="quick-stats" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="section-title">Overview</h2>
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <StatsCard key={i} title={stat.title} description={stat.description} to={stat.to} />
            ))}
          </div>
        </section>

        {/* If searchResults exist, show them; otherwise show featured */}
        {searchResults && searchResults.length > 0 ? (
          <section className="featured-recipes" aria-labelledby="search-results-heading">
            <h2 id="search-results-heading" className="section-title">Search Results</h2>
            <div className="recipe-grid">
              {searchResults.map((r) => (
                <Link key={r.id || r.recipeId || r.uri} className="recipe-link" to={`/recipes/${r.id || r.recipeId || ""}`}>
                  <RecipeCard id={r.id || r.recipeId || ""} name={r.title || r.name || r.recipeName} description={r.summary || r.description || ""} calories={r.calories || 0} />
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="featured-recipes" aria-labelledby="featured-heading">
            <h2 id="featured-heading" className="section-title">Featured Recipes</h2>
            <div className="recipe-grid">
              {featured.map((r) => (
                <Link key={r.id} className="recipe-link" to={`/recipes/${r.id}`}>
                  <RecipeCard id={r.id} name={r.title} description={r.summary} calories={r.calories || 0} />
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="daily-meals" aria-labelledby="meals-heading">
          <h2 id="meals-heading" className="section-title">Today's Meals</h2>
          <div className="meals-grid">
            {mealsElements}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
