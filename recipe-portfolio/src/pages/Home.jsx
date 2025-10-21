
import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { Link } from 'react-router-dom';
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
        { title: 'Planned Meals', description: `${plans?.length || 0} meals this week`, to: '/planner' },
        { title: 'Saved Recipes', description: `${recipes?.length || 0} recipes`, to: '/saved' },
        { title: 'Shopping List', description: 'View items', to: '/shopping' },
    ];

    // Fallback synthetic meals (used only when there are no user plans)
    const syntheticMeals = [
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

    // Prepare Today's Meals: prefer plans scheduled for today (local date), otherwise fallback to synthetic meals
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
                            <StatsCard key={i} title={stat.title} description={stat.description} to={stat.to} />
                        ))}
                    </div>
                </section>

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

