import React, { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import MealCard from '../components/MealCard';
import '../styles/components.css';

export function MealPlanner() {
    const { plans, addPlan, updatePlan, deletePlan } = usePlanner();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');
    const [editingId, setEditingId] = useState(null);

    const startEdit = (p) => {
        setEditingId(p.id);
        setName(p.name || '');
        setDescription(p.description || '');
        setCalories(p.calories || '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            updatePlan(editingId, { name, description, calories: Number(calories) || 0 });
            setEditingId(null);
        } else {
            const plan = { id: Date.now().toString(), name: name || 'New Meal', description, calories: Number(calories) || 0 };
            addPlan(plan);
        }
        setName('');
        setDescription('');
        setCalories('');
    };

        const handleDelete = (id) => {
            if (!window.confirm('Delete this plan?')) return;
            deletePlan(id);
        };

    return (
        <div className="meal-planner-page">
            <header>
                <h1>Meal Planner</h1>
                <p>Plan meals for the week and keep quick access to recipes.</p>
            </header>

            <section className="planner-form">
                <h2>{editingId ? 'Edit Meal' : 'Add Meal'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>

                    <label>
                        Description
                        <input value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>

                    <label>
                        Calories
                        <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
                    </label>

                    <div className="form-actions">
                        <button type="submit" className="btn primary">{editingId ? 'Save' : 'Add'}</button>
                        {editingId && <button type="button" className="btn secondary" onClick={() => { setEditingId(null); setName(''); setDescription(''); setCalories(''); }}>Cancel</button>}
                    </div>
                </form>
            </section>

            <section className="planner-list">
                <h2>Your Plans</h2>
                {plans.length === 0 ? (
                    <p>No plans yet — add one above.</p>
                ) : (
                    <div className="plans-grid">
                        {plans.map((p) => (
                            <div key={p.id}>
                                <MealCard name={p.name} description={p.description} calories={p.calories} />
                                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                                    <button className="btn small" onClick={() => startEdit(p)}>Edit</button>
                                    <button className="btn small" onClick={() => handleDelete(p.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default MealPlanner;
