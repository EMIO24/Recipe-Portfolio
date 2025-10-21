
import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { Hero } from '../components/HeroSection';
import RecipeCard from '../components/RecipeCard';
import { StatsCard } from '../components/StatsCard';
import MealCard from '../components/MealCard';
import { usePlanner } from '../context/PlannerContext';
import useRecipes from '../hooks/useRecipes';
import '../styles/components.css';

export function Home() {
    const { plans } = usePlanner();
    const { listRecipes } = useRecipes();
    const [recipes, setRecipes] = React.useState([]);

    React.useEffect(() => {
        listRecipes().then(list => setRecipes(list));
    }, [listRecipes]);

    // Stats data from context/localStorage
    const stats = [
        { title: 'Planned Meals', description: `${plans?.length || 0} meals this week` },
        { title: 'Saved Recipes', description: `${recipes?.length || 0} recipes` },
        { title: 'Shopping List', description: 'View items' },
    ];

    // Example meals for different times
    const meals = [
        { id: 'breakfast', name: 'Breakfast', description: 'Avocado Toast with Eggs', calories: 450 },
        { id: 'lunch', name: 'Lunch', description: 'Grilled Chicken Salad', calories: 550 },
        { id: 'dinner', name: 'Dinner', description: 'Salmon with Roasted Vegetables', calories: 650 },
    ];

    // Featured recipes (use first 3 from saved recipes or fallback)
    const featured = recipes.slice(0, 3).map(r => ({
        id: r.id,
        title: r.title || r.name,
        summary: r.description || r.summary || '',
        calories: r.calories || 0,
    })) || [
        { id: 1, title: 'Spaghetti Bolognese', summary: 'Classic family favorite', calories: 800 },
        { id: 2, title: 'Chicken Caesar Salad', summary: 'Light & fresh', calories: 400 },
        { id: 3, title: 'Vegetable Stir Fry', summary: 'Quick weeknight dinner', calories: 350 },
    ];

    return (
        <div className="home-page">
            <header>
            </header>

            <main>
                <section className="home-hero">
                    <Hero />
                    <SearchBar />
                </section>

                <section className="quick-stats" aria-labelledby="stats-heading">
                    <h2 id="stats-heading" className="section-title">Overview</h2>
                    <div className="stats-grid">
                        {stats.map((stat, i) => (
                            <StatsCard key={i} title={stat.title} description={stat.description} />
                        ))}
                    </div>
                </section>

                <section className="featured-recipes" aria-labelledby="featured-heading">
                    <h2 id="featured-heading" className="section-title">Featured Recipes</h2>
                    <div className="recipe-grid">
                        {featured.map((r) => (
                            <RecipeCard key={r.id} name={r.title} description={r.summary} calories={r.calories || 0} />
                        ))}
                    </div>
                </section>

                <section className="daily-meals" aria-labelledby="meals-heading">
                    <h2 id="meals-heading" className="section-title">Today's Meals</h2>
                    <div className="meals-grid">
                        {meals.map((meal) => (
                            <MealCard key={meal.id} name={meal.name} description={meal.description} calories={meal.calories} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;

