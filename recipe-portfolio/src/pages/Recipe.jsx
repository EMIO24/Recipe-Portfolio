import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import useRecipes from '../hooks/useRecipes';
import Navbar from '../components/Navbar.jsx';

export default function Recipe() {
    const { listRecipes, deleteRecipe } = useRecipes();
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;
        listRecipes().then((list) => {
            if (mounted) setRecipes(list);
        });
        return () => (mounted = false);
    }, [listRecipes]);

        const handleDelete = async (id) => {
            if (!window.confirm('Delete this recipe?')) return;
        try {
            await deleteRecipe(id);
            setRecipes((s) => s.filter((r) => String(r.id) !== String(id)));
        } catch (e) {
            console.error(e);
            alert('Failed to delete');
        }
    };

    const handleEdit = (id) => {
        navigate(`/add/${id}`);
    };

    return (
        <div className="recipes-page" style={{ textAlign: 'center',  marginTop: 100, padding: 24 }}>
            <Navbar />
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Recipes</h1>
                <Link to="/add" className="btn">Add Recipe</Link>
            </header>

            <section className="recipe-grid">
                {recipes.length === 0 ? (
                    <p>No recipes yet. Add one to get started.</p>
                ) : (
                    recipes.map((r) => (
                        <div key={r.id}>
                            <Link to={`/recipes/${r.id}`} className="recipe-link">
                                <RecipeCard name={r.title || r.name} description={r.summary || ''} calories={r.calories || 0} />
                            </Link>
                            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                                <button className="btn small" onClick={() => handleEdit(r.id)}>Edit</button>
                                <button className="btn small" onClick={() => handleDelete(r.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
}
