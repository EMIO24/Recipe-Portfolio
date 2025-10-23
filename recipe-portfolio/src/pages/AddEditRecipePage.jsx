import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import useRecipes from "../hooks/useRecipes";
import "../styles/add-edit-recipe.css";
import Navbar from "../components/Navbar.jsx";


/*
    Assumed existing project components / hooks. Adjust import paths if your project differs.
    - components/RecipeForm      -> form component that accepts initialData, onSubmit, submitLabel
    - components/PageHeader      -> simple header component that accepts title and optional subtitle
    - components/LoadingSpinner  -> small loading indicator
    - hooks/useRecipes           -> custom hook exposing getRecipe, createRecipe, updateRecipe
*/


function AddEditRecipePage() {
    const { id } = useParams(); // recipe id when editing
    const isEditing = Boolean(id);
    const navigate = useNavigate();

    const { getRecipe, createRecipe, updateRecipe } = useRecipes();

    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(isEditing); // only load when editing
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const loadRecipe = useCallback(async () => {
        if (!isEditing) return;
        setLoading(true);
        setError(null);
        try {
            const recipe = await getRecipe(id);
            // normalize if needed: ensure fields expected by RecipeForm exist
            setInitialData(recipe);
        } catch (err) {
            setError(err?.message || "Failed to load recipe");
        } finally {
            setLoading(false);
        }
    }, [getRecipe, id, isEditing]);

    useEffect(() => {
        loadRecipe();
    }, [loadRecipe]);

    const handleSubmit = async (data) => {
        setSaving(true);
        setError(null);
        try {
            if (isEditing) {
                await updateRecipe(id, data);
                navigate(`/recipes/${id}`, { replace: true });
            } else {
                const created = await createRecipe(data);
                // navigate to newly created recipe page if returned id exists
                const targetId = created?.id || created?._id;
                navigate(targetId ? `/recipes/${targetId}` : "/recipes", { replace: true });
            }
        } catch (err) {
            setError(err?.message || "Save failed");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
        <Navbar />
        <div className="ae-page-container" style={{ textAlign: 'center', marginTop: 100, padding: 24 }}>
            <PageHeader
                title={isEditing ? "Edit Recipe" : "Add New Recipe"}
                subtitle={isEditing ? "Make changes to your recipe and save." : "Create a new recipe to add to your portfolio."}
            />

            {loading ? (
                <div className="ae-loading">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    {error && (
                        <div className="ae-error">
                            {error}
                        </div>
                    )}

                    <RecipeForm
                        initialData={initialData}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        submitLabel={saving ? (isEditing ? "Saving..." : "Creating...") : isEditing ? "Save changes" : "Create recipe"}
                        disabled={saving}
                    />
                </>
            )}
        </div>
        </>
    );
}

export default AddEditRecipePage;