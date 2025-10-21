import React, { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import MealCard from '../components/MealCard';
import '../styles/components.css';
import '../styles/planner.css';
import { useToast } from '../context/ToastContext.jsx';
import { useNavigate } from 'react-router-dom';

export function MealPlanner() {
    const { plans, addPlan, updatePlan, deletePlan } = usePlanner();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [editingId, setEditingId] = useState(null);
    const { addToast } = useToast();

    const navigate = useNavigate();

    const startEdit = (p) => {
        setEditingId(p.id);
        setName(p.name || '');
        setDescription(p.description || '');
        setCalories(p.calories || '');
        setDate(p.date ? p.date.split('T')[0] : '');
        setTime(p.date ? p.date.split('T')[1]?.slice(0,5) : '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isoDate = date ? new Date(`${date}T${time || '00:00'}`)?.toISOString() : null;
        if (editingId) {
            updatePlan(editingId, { name, description, calories: Number(calories) || 0, date: isoDate });
            setEditingId(null);
            addToast({ message: 'Plan updated', type: 'success' });
        } else {
            const plan = { id: Date.now().toString(), name: name || 'New Meal', description, calories: Number(calories) || 0, date: isoDate };
            addPlan(plan);
            addToast({ message: 'Plan added', type: 'success' });
        }
        setName('');
        setDescription('');
        setCalories('');
        setDate('');
        setTime('');
    };

        const handleDelete = (id) => {
            if (!window.confirm('Delete this plan?')) return;
                deletePlan(id);
                addToast({ message: 'Plan deleted', type: 'info' });
        };

        const handleAddToShopping = (plan) => {
            try {
                const raw = localStorage.getItem('rp_shopping_v1');
                const items = raw ? JSON.parse(raw) : [];
                // Add plan name as a shopping item (simple behavior); in a real app you'd add ingredient list
                items.push({ id: Date.now().toString(), text: plan.name });
                localStorage.setItem('rp_shopping_v1', JSON.stringify(items));
                addToast({ message: 'Added to shopping list', type: 'success' });
            } catch (e) {
                addToast({ message: 'Failed to add to shopping', type: 'error' });
            }
        };

        const handleViewRecipe = (plan) => {
            // If there's an associated recipe id, navigate; otherwise go to planner detail
            // For now, navigate to planned detail page
            navigate(`/planned/${plan.id}`);
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
                                                        <div className="field-group">
                                                                <label>Name</label>
                                                                <input value={name} onChange={(e) => setName(e.target.value)} required />
                                                        </div>

                                                        <div className="field-group">
                                                                <label>Description</label>
                                                                <input value={description} onChange={(e) => setDescription(e.target.value)} />
                                                        </div>

                                                        <div className="row">
                                                            <div className="field-group">
                                                                <label>Calories</label>
                                                                <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
                                                            </div>

                                                            <div className="field-group">
                                                                <label>Date</label>
                                                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="field-group">
                                                                <label>Time</label>
                                                                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                                                            </div>
                                                            <div aria-hidden style={{ visibility: 'hidden' }} />
                                                        </div>

                                        <div className="form-actions">
                                                <button type="submit" className="btn primary">{editingId ? 'Save' : 'Add'}</button>
                                                {editingId && <button type="button" className="btn secondary" onClick={() => { setEditingId(null); setName(''); setDescription(''); setCalories(''); setDate(''); setTime(''); }}>Cancel</button>}
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
                            <div key={p.id} className="plan-item">
                                <MealCard name={p.name} description={p.description} calories={p.calories} onViewRecipe={() => handleViewRecipe(p)} onSaveToShopping={() => handleAddToShopping(p)} />
                                <div className="plan-meta">
                                    {p.date && (
                                        <div className="plan-datetime">{new Date(p.date).toLocaleString()}</div>
                                    )}
                                </div>
                                <div className="plan-actions">
                                    <button className="btn small" onClick={() => startEdit(p)}>Edit</button>
                                    <button className="btn small" onClick={() => handleDelete(p.id)}>Delete</button>
                                    <button className="btn small" onClick={() => { navigator.clipboard?.writeText(p.name || ''); addToast({ message: 'Copied name', type: 'info' }); }}>Copy Name</button>
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
