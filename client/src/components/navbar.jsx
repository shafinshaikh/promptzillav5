// components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            {/* Add more navigation links as needed */}
        </nav>
    );
}

export default Navbar;
