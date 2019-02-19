import React, { Component } from 'react';

import styles from './autocomplete.css';

// ****icon imports****
import FilmIcon from '-!svg-react-loader?name=Icon!../../assets/icons/film-solid.svg';
import FilmIconBl from '-!svg-react-loader?name=Icon!../../assets/icons/film-solid-bl.svg';

class SearchInput extends Component {
  state = {
    suggestions: [],
    input: '',
    fetchedItems: {}
  };

  onTextChanged = e => {
    const value = e.target.value;

    this.setState({ input: value });

    if (value.length < 3) {
      this.setState({ suggestions: [] });
    }
    if (value.length >= 3) {
      const handleFetchedData = () => {
        const data = this.state.fetchedItems.results.slice(0, 8).map(item => ({
          title: item.title,
          rating: item.vote_average,
          release_date: item.release_date.slice(0, 4),
          id: item.id
        }));
        this.setState(state => ({ ...state, suggestions: data }));
      };

      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&query=${value}&page=1&include_adult=false`
      )
        .then(res => res.json())
        .then(payload => this.setState({ fetchedItems: payload }))
        .then(handleFetchedData())
        .catch(err => console.log(err));
    }
  };

  suggestionSelected = selected => {
    this.setState(() => ({
      input: selected,
      suggestions: []
    }));
  };

  renderSuggestions() {
    const { suggestions } = this.state;

    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        <li>
          <FilmIconBl />
          {this.state.input}
          <div>Enter a movie name</div>
        </li>
        {suggestions.map(item => (
          <li key={item.id}>
            <div onClick={() => this.suggestionSelected(item.title)}>{item.title}</div>
            <div>
              Rating: {item.rating}, {item.release_date}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { input } = this.state;

    return (
      <React.Fragment>
        <label htmlFor="search">
          <FilmIcon />
        </label>
        <input
          id="search"
          name="search"
          className={styles.search}
          value={input}
          onChange={this.onTextChanged}
          type="text"
          placeholder="Enter movie name"
          autoComplete="off"
        />
        {this.renderSuggestions()}
      </React.Fragment>
    );
  }
}

export default SearchInput;
