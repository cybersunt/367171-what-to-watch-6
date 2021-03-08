import React, {useEffect, useState} from "react";
import ButtonShowMore from "../../blocks/button-show-more/button-show-more";
import MoviesList from "../../blocks/movies-list/movies-list";
import PropTypes from "prop-types";
import GenresList from "../../blocks/genres-list/genres-list";
import classnames from "classnames";
import MovieCard from "../movie-card/movie-card";
import {connect} from "react-redux";
import {fetchMoviesList} from "../../../store/api-actions";
import Loader from "../../blocks/loader/loader";

const Catalog = ({movies, isDataLoaded, onLoadData, currentGenre, currentMovieGenre, filter = false, title = `Catalog`, className}) => {

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]);

  const [isFilteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    if (isDataLoaded) {
      const filteredMovies = movies.filter(({genre}) => currentGenre === `All genres` ? genre : genre === currentGenre);
      setFilteredMovies(filteredMovies);
    }
  }, [isDataLoaded, currentGenre]);

  if (!isDataLoaded) {
    return (
      <Loader/>
    );
  }

  const similarMovies = movies.filter(({genre}) => genre === currentMovieGenre);
  const moviesItems = currentMovieGenre ? similarMovies : isFilteredMovies;

  return (
    <section className={(classnames(`catalog`, className))}>
      <h2 className={classnames(`catalog-title`, {[`visually-hidden`]: title === `Catalog`})}>{title}</h2>

      {filter ? <GenresList /> : null}

      <MoviesList movieItems={moviesItems}/>

      {moviesItems.length > 8 ? <ButtonShowMore/> : null}

    </section>
  );
};

Catalog.propTypes = {
  ...MovieCard.propTypes,
  ...GenresList.propTypes,
  className: PropTypes.string,
  filter: PropTypes.bool,
  title: PropTypes.string,
  currentMovieGenre: PropTypes.string
};

const mapStateToProps = (state) => ({
  isDataLoaded: state.isDataLoaded,
  movies: state.movies,
  currentGenre: state.currentGenre
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchMoviesList());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
