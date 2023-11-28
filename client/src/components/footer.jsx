// components/Footer.jsx
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <footer className="bg-[#8976fd] text-white text-center p-4">
            <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Promptzilla. All rights reserved.</p>
            {/* Add additional footer content as needed */}
        </footer>
    );
}

export default Footer;
