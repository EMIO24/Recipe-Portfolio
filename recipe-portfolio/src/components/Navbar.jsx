
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-content">
                <div className="brand">
                    <Link to="/" className="logo">🍴 MealMate</Link>
                </div>

                <nav className="nav-links">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/recipes">Recipes</Link>
                    <Link className="nav-link" to="/planner">Meal Planner</Link>
                    <Link className="nav-link" to="/shopping">Shopping</Link>
                    <Link className="nav-link" to="/profile">Profile</Link>
                </nav>

                <div className="nav-actions">
                    <div className="search-placeholder">🔍</div>
                    <div className="profile-placeholder">👤</div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;