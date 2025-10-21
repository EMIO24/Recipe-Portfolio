import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';

export default function SavedRecipes(){
  const { listRecipes } = useRecipes();
  const [recipes, setRecipes] = useState([]);

  useEffect(()=>{
    listRecipes().then(list => setRecipes(list));
  },[listRecipes]);

  return (
    <div style={{padding:24}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1>Saved Recipes</h1>
        <Link to="/add" className="btn">Add Recipe</Link>
      </header>

      <section style={{marginTop:16}}>
        {recipes.length === 0 ? (
          <p>No saved recipes yet.</p>
        ) : (
          <div className="recipe-grid">
            {recipes.map(r => (
              <Link key={r.id} to={`/recipes/${r.id}`} className="recipe-link">
                <RecipeCard id={r.id} name={r.title || r.name} description={r.summary || ''} calories={r.calories || 0} image={r.image} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
