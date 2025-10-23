import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';


export default function ShoppingList() {
	const [items, setItems] = useState([]);
	const [text, setText] = useState('');

	useEffect(() => {
		try {
			const raw = localStorage.getItem('rp_shopping_v1');
			setItems(raw ? JSON.parse(raw) : []);
		} catch (e) {
			setItems([]);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('rp_shopping_v1', JSON.stringify(items));
	}, [items]);

	const add = (e) => {
		e.preventDefault();
		if (!text.trim()) return;
		setItems((s) => [...s, { id: Date.now().toString(), text: text.trim() }]);
		setText('');
	};

	const remove = (id) => setItems((s) => s.filter((i) => i.id !== id));

	return (
        <>
        <Navbar />
		<div style={{ padding: 20, marginTop: 100, textAlign: 'center' }}>
			<header>
				<h1>Shopping List</h1>
				<p>Keep ingredients handy for your planned meals.</p>
			</header>

			<form onSubmit={add} style={{ marginBottom: 12 }}>
				<input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add ingredient" />
				<button type="submit" className="btn">Add</button>
			</form>

			<ul>
				{items.map((it) => (
					<li key={it.id}>
						{it.text} <button onClick={() => remove(it.id)} className="btn small">Remove</button>
					</li>
				))}
			</ul>

			<div style={{ marginTop: 18 }}>
				<Link to="/planner">Back to planner</Link>
			</div>
		</div>
        </>
	);
}
