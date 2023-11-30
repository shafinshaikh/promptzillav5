import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [userPrompts, setUserPrompts] = useState([]);
    const [sharedPrompts, setSharedPrompts] = useState([]);
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        fetchUserPrompts();
        fetchSharedPrompts();
        fetchStatistics();
    }, []);

    const fetchUserPrompts = async () => {
        try {
            // Replace 'userId' with actual user ID
            const response = await fetch('http://localhost:3000/api/history/shafin@gmail.com'); 
            if(response.ok) {
                const data = await response.json();
                setUserPrompts(data);
            }
        } catch (error) {
            console.error('Error fetching user prompts:', error);
        }
    };

    const fetchSharedPrompts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/shared-prompts');
            if(response.ok) {
                const data = await response.json();
                setSharedPrompts(data);
            }
        } catch (error) {
            console.error('Error fetching shared prompts:', error);
        }
    };

    const fetchStatistics = async () => {
        // Implement fetching of statistics
        // This could be an API call similar to the above ones
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-[#8976fd] mb-6">Dashboard</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Prompt History</h2>
                <div>
                    {userPrompts.map((prompt, index) => (
                        <div key={index} className="mb-2 p-4 bg-white shadow-md rounded">
                            <p className="font-medium">{prompt.prompt}</p>
                            {/* Add other prompt details as needed */}
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shared Prompts</h2>
                <div>
                    {sharedPrompts.map((prompt, index) => (
                        <div key={index} className="mb-2 p-4 bg-white shadow-md rounded">
                            <p className="font-medium">{prompt.prompt}</p>
                            {/* Add other shared prompt details as needed */}
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Statistics</h2>
                <div>
                    {/* Implement the statistics display here */}
                    <p>Statistics will be displayed here.</p>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
