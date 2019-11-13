import React from 'react';
import './filter.scss';

const Filter = props => {
  const handleInput = e => {
    props.handleFilter(e.target.value);
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