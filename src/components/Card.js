import React, { useState } from 'react';
import './Card.css'; // Import the CSS file

const Card = ({ id, title, image, rating, reviews, onDelete }) => {
    const [showReviews, setShowReviews] = useState(false);

    const handleReviewClick = () => {
        setShowReviews(!showReviews);
    };
    const handleDeleteClick = () => {
        onDelete(id);
    };

    return (
        <div className="card-container">
            <div className="card">
                <img src={image} alt={title} className="card-image" />
                <h3 className="card-title">{title.toUpperCase()}</h3>
                <p className="card-rating">Rating: {rating}</p>
                <button onClick={handleReviewClick} className="review-button">
                    {showReviews ? 'Hide Reviews' : 'Show Reviews'}
                </button>
                <button onClick={handleDeleteClick} className="delete-button">
                    Delete
                </button>

                {showReviews && (
                    <div className="review-container">
                        <h4>Review 1:</h4>
                        <p className="review-text">{reviews[0]}</p>

                        <h4>Review 2:</h4>
                        <p className="review-text">{reviews[1]}</p>

                        <h4>Review 3:</h4>
                        <p className="review-text">{reviews[2]}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
