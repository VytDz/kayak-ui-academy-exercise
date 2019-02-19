import React from 'react';
import SearchInput from './SearchInput';

import styles from './autocomplete.css';

import SearchIcon from '-!svg-react-loader?name=Icon!../../assets/icons/search-solid.svg';

const Autocomplete = () => (
  <div className={styles.container}>
    <SearchInput />
    <button type="button" className={styles.button}>
      <SearchIcon />
    </button>
  </div>
);

export default Autocomplete;
