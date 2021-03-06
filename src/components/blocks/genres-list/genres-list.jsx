import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../../store/actions";

const GenresList = ({genresItems, currentGenre, resetFilter, changeGenre}) => {

  const onChangeFilter = (evt) => {
    evt.preventDefault();
    resetFilter();
    changeGenre(evt);
  };

  return (
    <ul className="catalog__genres-list" onClick={onChangeFilter}>
      {genresItems.map((item, index) => {
        return (
          <li key={index} className={classnames(`catalog__genres-item`, {[`catalog__genres-item--active`]: currentGenre === item})}>
            <a id={item} href="#" className="catalog__genres-link">{item}</a>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  currentGenre: PropTypes.string,
  genresItems: PropTypes.arrayOf(PropTypes.string),
  resetFilter: PropTypes.func,
  changeGenre: PropTypes.func
};

const mapStateToProps = ({currentGenre, genresItems}) => {
  return {currentGenre, genresItems};
};

const mapDispatchToProps = (dispatch) => {

  const {changeGenre, resetFilter} = bindActionCreators(actions, dispatch);

  return {changeGenre, resetFilter};
};

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
