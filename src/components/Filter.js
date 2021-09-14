import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize } from '../utils'
import { applyFilter } from '../redux/actions';
import {FaCaretDown, FaCaretRight} from 'react-icons/fa';
import '../styles/filter.scss';

const Filter = () => {
  const [ selectedCategories, setSelectedCategories] = useState([]);
  const [ showOptions, setShowOptions ] = useState(false);
  const list = useSelector(state => state.okrData.categories);
  const dispatch = useDispatch();

  const handleCheck = (e) => {
    e.preventDefault();
    let category = e.target.dataset.category;
    let filteredCats = selectedCategories;
    if (filteredCats.includes(category)) {
      filteredCats = filteredCats.filter(item => item !== category)
    } else {
      filteredCats = [...filteredCats, category];
    }
    setSelectedCategories(filteredCats);
    dispatch(applyFilter(filteredCats));
  }

  const handleRemove = (e) => {
    e.stopPropagation();
    let category = e.target.dataset.cat;
    let tempList = selectedCategories.filter(item => item !== category);
    setSelectedCategories(tempList);
    dispatch(applyFilter(tempList));
  }

  const handleToggle = () => {
    setShowOptions(!showOptions);
  }


  return (
    <div className="filter-container">
      <div className="filter-input">
        <div onClick={handleToggle} className="placeholder">
          Select category
          {
            showOptions
            ?
            <FaCaretDown className="arrow"/>
            :
            <FaCaretRight className="arrow"/>
          }
        </div>
        <div className="filter-options">
          {
            showOptions
            &&
            list.map((cat, index) => 
              <div value={cat} key={cat}> 
                <input
                  type="checkbox"
                  onChange={handleCheck}
                  data-category={cat}
                  checked={selectedCategories.includes(cat)}
                />
                {capitalize(cat)}
              </div>
            )
          }
        </div>
      </div>
      <div className="filter-list">
        {
          selectedCategories.map(cat => 
            <div className="filter-item" onClick={handleRemove}>
              {capitalize(cat)}
              <div data-cat={cat}>X</div>
            </div>
          )
        }
      </div>
    </div>
  )
};

export default Filter;