import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getColor } from '../utils'
import Modal from '../components/Modal';
import MetricInfo from '../components/MetricInfo';
import Filter from '../components/Filter';
import '../styles/list.scss'
import { fetchOkrs } from '../redux/actions';
import {FaCaretDown, FaCaretRight} from 'react-icons/fa';

const List = () => {
  const [ rootList, setRootList ] = useState([]);
  const [ currData, setCurrData ] = useState({});
  const [ showModal, setShowModal ] = useState(false);
  const [ collapsedList, setCollapsedList ] = useState([]);
  const data = useSelector(state => state.okrData.data)
  const loading = useSelector(state => state.okrData.loading);
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchOkrs()), []);

  useEffect(() => {
    if (data) {
      // Objectives with no parent objective Id goes in this list
      const parentList = data.filter(item => !item.parent_objective_id);
      setRootList(parentList);
    } 
  }, [data]);

  const openModal = (item) => {
    setShowModal(true);
    setCurrData(item);
  }

  const handleFilter = (categoriesList) => {
    let filteredData = data.filter(okr => categoriesList.includes(okr.category.toLowerCase()));
    setData(filteredData);
  }

  const handleExpand = (id, e) => {
    e.stopPropagation();
    setCollapsedList(collapsedList.filter(item => item !== id));
  }

  const handleCollapse = (id, e) => {
    e.stopPropagation();
    setCollapsedList([...collapsedList, id]);
  }

  const renderList = (item, index, level=0) => {
    const children = data.filter(okr => (okr.parent_objective_id === item.id));
    if (children.length === 0) {
      return (
        <div 
          key={item.id} 
          className="list-item" 
          style={{marginLeft: level*30, background: getColor(index, level) }}
          onClick={() => openModal(item)}
        >
          <span>{level === 0 && `${index+1}.`}</span>
          {item.title}
        </div>
      )
    }
    return (
      <div key={item.id}>
        <div className="list-item" onClick={() => openModal(item)}>
          {
            collapsedList.includes(item.id)
            ?
            <FaCaretRight onClick={(e) => handleExpand(item.id, e)} className="arrows"/>
            :
            <FaCaretDown onClick={(e) => handleCollapse(item.id, e)} className="arrows"/>
          }
          <span>{(level === 0) && `${index+1}.`}</span>
          {item.title}
        </div>
        {!collapsedList.includes(item.id) && children.map((child, idx) => renderList(child, idx, level+1))}
      </div>
    )
  }

  return (
    <>
      {
        loading
        ?
        'Loading....'
        :
        <div className="container">
          <Filter onChange={handleFilter}/>
          {
            rootList.map((item, idx) => 
              <div key={item.id} className="list">
                {renderList(item, idx)}
              </div>
            )
          }
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <MetricInfo currData={currData} />
          </Modal>
        </div>
      }
    </>
  );
}

export default List;