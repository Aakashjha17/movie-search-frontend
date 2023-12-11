import React, { useState, useEffect } from 'react';
import { getALL, getMovie, deleteMovie } from '../api/index.js';
import Card from '../components/Card.js';
import './Dashboard.css';

const Dashboard = () => {
    const [movieHistory, setMovieHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchMovieHistory = async () => {
            try {
                const response = await getALL();
                const data = await response.data;
                setMovieHistory(data);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };
        fetchMovieHistory();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteMovie(id);
            setMovieHistory((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    const handleSearch = async () => {
        try {
            setIsSearching(true); // Set searching state to true
            const response = await getMovie(searchQuery);
            const data = await response.data;
            setMovieHistory([data]);
            window.location.reload();
        } catch (error) {
            console.error('Error searching for movies:', error);
        } finally {
            setIsSearching(false); // Reset searching state to false regardless of success or failure
        }
    };

    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? 'Searching...' : 'Search'}
                </button>
            </div>
            <h2>Searched Movies</h2>
            <div className="dashboard-card">
                {movieHistory.map((movie) => (
                    <Card
                        key={movie._id}
                        id={movie._id}
                        title={movie.title}
                        image={movie.image}
                        rating={movie.rating}
                        reviews={movie.review}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </>
    );
};

export default Dashboard;
