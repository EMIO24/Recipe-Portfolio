
import { Link } from "react-router-dom";

function Navbar(){
    return <nav>
        <div>
            <Link to='/'>Home</Link>
        </div>
        <div>
            <Link to='/Recipe'>Recipe</Link>
        </div>
        <div>
            <Link to='/MealPlanner'>MealPlanner</Link>
        </div>
        <div>
            <Link to='/Profile'>Profile</Link>
        </div>
    </nav>
}

export default Navbar