import React from 'react';
import './filter.scss';

const Filter = props => {
  const { toggleFiltered, handleFilter } = props;
  const handleInput = e => {
    if (e.target.value) {
      toggleFiltered(true);
      handleFilter(e.target.value);
    } else {
      toggleFiltered(false);
    }
  }

  return (
    <div className="filter">
      <input
        id='name-input'
        type="text"
        placeholder='Filter by worker name or id'
        onChange={handleInput}
      />
    </div>
  )
}

export default Filter;