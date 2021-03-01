import React from "react";

const MovieCardNav = ()=> {
  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        <li className="movie-nav__item movie-nav__item--active">
          <a href="#" className="movie-nav__link">Overview88888</a>
        </li>
        <li className="movie-nav__item">
          <a href="#" className="movie-nav__link">Details</a>
        </li>
        <li className="movie-nav__item">
          <a href="#" className="movie-nav__link">Reviews</a>
        </li>
      </ul>
    </nav>
  );
};

export default MovieCardNav;
