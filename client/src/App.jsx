// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/login';
import Register from './components/register';
import Navbar from './components/navbar';
import Dashboard from './components/dashboard';
import PromptSuggestions from './components/promptsuggestions';
import SharedPrompts from './components/sharedPrompts';
import UserHistory from './components/userHistory';
// Import other components as needed

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/promptSuggestions" element={<PromptSuggestions />} />
                <Route path="/sharedPrompts" element={<SharedPrompts />} />
                <Route path="/userHistory" element={<UserHistory />} />
                {/* Define more routes for other components */}
            </Routes>
        </Router>
    );
}

export default App;
