import React from 'react';

function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <img src={"http://localhost:8070/" + movie.image} alt="movie poster" className="movie-poster" />
            <div className="movie-info">
                {/* <h1 className="movie-title">I am not okay with this</h1> */}
                {/* <button className="btn-watch">Watch Now</button> */}
            </div>
        </div>


    );
}

export default MovieCard;