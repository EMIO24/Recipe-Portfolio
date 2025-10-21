import React, { useState, useEffect } from 'react';

export default function RecipeForm({ initialData = null, onSubmit, onCancel, submitLabel = 'Save', disabled = false }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setIngredients((initialData.ingredients || []).join('\n'));
      setInstructions(initialData.instructions || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: title.trim(),
      ingredients: ingredients
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      instructions: instructions.trim(),
    };
    onSubmit && onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <label>
        Ingredients (one per line)
        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} rows={6} />
      </label>

      <label>
        Instructions
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={8} />
      </label>

      <div className="form-actions">
        <button type="button" onClick={onCancel} disabled={disabled} className="btn secondary">
          Cancel
        </button>
        <button type="submit" disabled={disabled} className="btn primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
