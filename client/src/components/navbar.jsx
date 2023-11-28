import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-[#8976fd] p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link to="/" className="text-lg font-semibold hover:text-purple-300 mr-4">Home</Link>
                    <Link to="/login" className="text-lg font-semibold hover:text-purple-300 mr-4">Login</Link>
                    <Link to="/register" className="text-lg font-semibold hover:text-purple-300">Register</Link>
                    {/* Add more navigation links as needed */}
                </div>
                {/* Additional navbar content (if any) */}
            </div>
        </nav>
    );
}

export default Navbar;
