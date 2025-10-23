import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

export default function NotFound() {
	return (
        <><Navbar />
            <div style={{ padding: 40, textAlign: 'center' }}>
			<h1>404 — Page not found</h1>
			<p>We couldn't find the page you're looking for.</p>
			<p>
				<Link to="/">Go back home</Link>
			</p>
		    </div>
		</>
	);
}
