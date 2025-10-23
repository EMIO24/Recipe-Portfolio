
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <section className="navbar-fixed-top">
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

            </div>
        </section>
    );
}

