import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';
import LoadingSpinner from '../components/LoadingSpinner';
import Navbar from '../components/Navbar.jsx';


export default function RecipeDetail() {
	const { id } = useParams();
	const { getRecipe } = useRecipes();
	const [recipe, setRecipe] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;
		setLoading(true);
		getRecipe(id)
			.then((r) => {
				if (mounted) setRecipe(r);
			})
			.catch((e) => {
				if (mounted) setError(e?.message || 'Not found');
			})
			.finally(() => mounted && setLoading(false));

		return () => (mounted = false);
	}, [getRecipe, id]);

	if (loading) return <LoadingSpinner />;
	if (error)
		return (
			<div style={{ padding: 24 }}>
				<p>{error}</p>
				<Link to="/recipes">Back to recipes</Link>
			</div>
		);

	return (
		<div className="recipe-detail" style={{ padding: 24, marginTop: 100, textAlign: 'center' }}>
			<Navbar />
			<h1>{recipe.title || recipe.name}</h1>
			{recipe.summary && <p>{recipe.summary}</p>}

			{recipe.ingredients && (
				<section>
					<h3>Ingredients</h3>
					<ul>
						{recipe.ingredients.map((ing, i) => (
							<li key={i}>{ing}</li>
						))}
					</ul>
				</section>
			)}

			{recipe.instructions && (
				<section>
					<h3>Instructions</h3>
					<p style={{ whiteSpace: 'pre-wrap' }}>{recipe.instructions}</p>
				</section>
			)}

			<div style={{ marginTop: 18 }}>
				<Link to="/recipes" className="btn">Back to recipes</Link>
			</div>
		</div>
	);
}
